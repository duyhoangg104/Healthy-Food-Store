/** @format */

const express = require("express");
const { check } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createOrUpdateMeal,
  getMeal,
  getMealProducts,
  removeProductFromMealItem,
} = require("../controllers/meal");

const router = express.Router();

router.post(
  "/",
  [
    check("title")
      .trim()
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập tiêu đề"),
    check("products").isArray({ min: 1 }).withMessage("Vui lòng chọn sản phẩm"),
  ],
  authMiddleware,
  createOrUpdateMeal
);

router.get("/:mealId", authMiddleware, getMealProducts);

router.delete(
  "/:mealId/:mealProductId",
  authMiddleware,
  removeProductFromMealItem
);

router.get("/", authMiddleware, getMeal);

module.exports = router;
