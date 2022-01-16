/** @format */

const Category = require("../models/ProductCategory");
const Product = require("../models/Product");
const errorMessages = require("../constants/messages");
const { validationResult } = require("express-validator");

const createNewCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { title, description, imageUrl, status, id } = req.body;

  if (id) {
    try {
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: id },
        {
          title,
          description,
          imageUrl,
          status,
        }
      );
      return res.json({
        msg: "Chỉnh sửa category thành công",
        updatedCategory,
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message || errorMessages.systemErrorMsg,
      });
    }
  }

  try {
    const newCategory = new Category({
      title,
      description,
      imageUrl,
      createdBy: req.id,
      status,
    });
    const category = await newCategory.save();
    return res.status(201).json({
      msg: "Tạo mới category thành công",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const getCategories = async (req, res) => {
  const { status } = req.query;
  let categories = [];
  let query = {};

  if (status) {
    query.status = status;
  }

  try {
    categories = await Category.find(query);

    return res.json(categories || []);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const setNormalCategories = async (_, res) => {
  try {
    await Category.updateMany(
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

const toggleCategoryStatus = async (req, res) => {
  const { status, category } = req.query;

  try {
    const session = await Category.startSession();

    await session.withTransaction(() => {
      return Category.findOneAndUpdate(
        { _id: category },
        {
          status,
        },
        { session: session }
      );
    });

    await session.withTransaction(() => {
      return Product.updateMany(
        { category },
        {
          status,
        },
        { session: session }
      );
    });

    session.endSession();

    return res.status(200).json({
      msg: "Cập nhật category type thành công",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

module.exports = {
  createNewCategory,
  getCategories,
  setNormalCategories,
  toggleCategoryStatus,
};
