const errorMessages = require("../constants/messages");
const { validationResult } = require("express-validator");
const Meal = require("../models/Meal");
const MealProduct = require("../models/MealProduct");

const createOrUpdateMeal = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { title, products } = req.body;

  let existingMeal;

  try {
    existingMeal = await Meal.findOne({ user: req.id });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }

  if (existingMeal) {
    try {
      const session = await Meal.startSession();

      const newMealProduct = new MealProduct({
        title,
        products,
        meal: existingMeal._id,
      });

      await session.withTransaction(() => {
        return newMealProduct.save({ session: session });
      });

      existingMeal.list.push(newMealProduct._id);

      await session.withTransaction(() => {
        return existingMeal.save({ session: session });
      });

      session.endSession();

      return res.status(201).json({
        msg: "Tạo khẩu phần ăn thành công",
        newMealProduct,
        meal: existingMeal,
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message || errorMessages.systemErrorMsg,
      });
    }
  }

  try {
    const newMeal = new Meal({
      title,
      user: req.id,
    });

    const newMealProduct = new MealProduct({
      title,
      products,
      meal: newMeal._id,
    });

    const session = await Meal.startSession();

    await session.withTransaction(() => {
      return newMealProduct.save({ session: session });
    });

    newMeal.list.push(newMealProduct._id);

    await session.withTransaction(() => {
      return newMeal.save({ session: session });
    });

    session.endSession();

    return res.status(201).json({
      msg: "Tạo khẩu phần ăn thành công",
      newMealProduct,
      meal: newMeal,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const getMeal = async (req, res) => {
  try {
    const meal = await Meal.findOne({ user: req.id });

    return res.json({
      meal: meal || null,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const getMealProducts = async (req, res) => {
  try {
    const mealProducts = await MealProduct.find({
      meal: req.params.mealId,
    }).populate("products.product", "_id title price imageUrl calor origin");

    return res.json({
      mealProducts: mealProducts || [],
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const removeProductFromMealItem = async (req, res) => {
  const { mealId, mealProductId } = req.params;

  const { productIndex } = req.query;

  let mealData;
  let mealProductData;

  try {
    mealData = await Meal.findOne({ user: req.id, _id: mealId });
    mealProductData = await MealProduct.findOne({
      meal: mealId,
      _id: mealProductId,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }

  if (!mealData || !mealProductData) {
    return res.status(404).json({
      msg: "Không tìm được phần ăn tương ứng",
    });
  }

  try {
    mealProductData.products.splice(productIndex, 1);
    if (!mealProductData.products.length) {
      const mealProductIndex = mealData.list.findIndex(
        (id) => id.toString() === mealProductId
      );
      if (mealProductIndex !== -1) {
        mealData.list.splice(mealProductIndex, 1);
      }
      await mealData.save();
      await mealProductData.remove();
    } else {
      await mealProductData.save();
    }
    return res.json({
      msg: "Xóa bỏ sản phẩm trong phần ăn thành công",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

module.exports = {
  createOrUpdateMeal,
  getMeal,
  getMealProducts,
  removeProductFromMealItem,
};
