/** @format */

const { validationResult } = require("express-validator");
const Product = require("../models/Product");
const Category = require("../models/ProductCategory");

const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const {
    title,
    ingredients,
    imageUrl,
    category,
    description,
    origin,
    price,
    calor,
    status,
  } = req.body;

  let findedCategory;

  try {
    findedCategory = await Category.findById(category);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }

  if (!findedCategory) {
    return res.status(404).json({
      msg: "Category không tồn tại",
    });
  }

  if (findedCategory?.status !== status) {
    return res.status(403).json({
      msg: "Category không hợp lệ",
    });
  }

  try {
    const product = new Product({
      title,
      ingredients,
      imageUrl,
      category,
      description,
      origin,
      price,
      calor,
      createdBy: req.id,
      status,
    });

    await product.save();

    findedCategory.products.push(product._id);

    await findedCategory.save();

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const getProducts = async (req, res) => {
  const query = {};

  if (req.role === "manager") {
    query.createdBy = req.id;
  }

  if (req.query.category) {
    query.category = req.query.category;
  }

  let products = [];

  try {
    products = await Product.find(query).select("-createdBy");

    return res.json(products);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const getProductDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("-createdBy");

    if (!product) {
      return res.status(404).json({
        msg: "Ko tìm thấy sản phẩm phù hợp",
      });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        msg: "Ko tìm thấy sản phẩm phù hợp",
      });
    }

    const {
      title,
      ingredients,
      imageUrl,
      category,
      description,
      origin,
      price,
      calor,
    } = req.body;

    const currentCategory = product.category;

    title ? (product.title = title) : null;
    ingredients ? (product.ingredients = ingredients) : null;
    imageUrl ? (product.imageUrl = imageUrl) : null;
    description ? (product.description = description) : null;
    origin ? (product.origin = origin) : null;
    price ? (product.price = price) : null;
    calor ? (product.calor = calor) : null;

    if (!category || currentCategory === category) {
      await product.save();
      return res.json(product);
    }

    product.category = category;

    let categoryDetail;

    try {
      categoryDetail = await Category.findById(category);
    } catch (error) {
      return res.status(404).json({
        msg: "Ko tìm thấy category phù hợp",
      });
    }

    if (!categoryDetail) {
      return res.status(404).json({
        msg: "Ko tìm thấy category phù hợp",
      });
    }

    product.status = categoryDetail.status;

    const session = await Category.startSession();

    await session.withTransaction(() => {
      return Category.findOneAndUpdate(
        { _id: currentCategory },
        {
          $pull: { products: req.params.id },
        },
        { session: session }
      );
    });

    await session.withTransaction(() => {
      return Category.findOneAndUpdate(
        { _id: category },
        {
          $push: { products: req.params.id },
        },
        { session: session }
      );
    });

    await session.withTransaction(() => {
      return product.save({ session: session });
    });

    session.endSession();

    return res.json(product);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product || product?.createdBy?.toString() !== req.id) {
      return res.status(404).json({
        msg: "Ko tìm thấy sản phẩm",
      });
    }

    const currentCategory = product.category;

    const session = await Product.startSession();

    await session.withTransaction(() => {
      return product.remove();
    });

    await session.withTransaction(() => {
      return Category.findOneAndUpdate(
        { _id: currentCategory },
        {
          $pull: { products: id },
        },
        { session: session }
      );
    });

    session.endSession();

    return res.json({
      msg: "Loại bỏ sản phẩm thành công",
      deletedProductId: id,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const searchProductsByTitle = async (req, res) => {
  const { q } = req.query;

  let query = {};

  if (req.role === "manager") {
    query.createdBy = req.id;
  }

  if (q) {
    query.title = {
      $regex: q,
      $options: "i",
    };
  }

  let products = [];

  try {
    products = await Product.find(query).select("-createdBy");

    return res.json(products);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const deactivateProduct = async (req, res) => {
  const { newStatus } = req.query;
  try {
    await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        isActivated: newStatus === "true" ? true : false,
      }
    );
    return res.status(202).json({
      msg: `${
        newStatus === "true" ? "Sản phẩm còn hàng" : "Sản phẩm này đã hết hàng"
      }`,
      deactivatedProductId: req.params.id,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const setNormalProductsStatus = async (_, res) => {
  try {
    await Product.updateMany(
      {
        status: undefined,
      },
      { status: "normal" }
    );
    res.json({
      msg: "Success",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const checkProductAcivatedStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    return res.json({
      id,
      isActivated: product.isActivated,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductDetail,
  updateProduct,
  deleteProduct,
  searchProductsByTitle,
  deactivateProduct,
  setNormalProductsStatus,
  checkProductAcivatedStatus,
};
