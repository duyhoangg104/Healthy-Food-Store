/** @format */

const express = require("express");
const { check } = require("express-validator");
const {
  createNewCategory,
  getCategories,
  setNormalCategories,
  toggleCategoryStatus,
} = require("../controllers/categories");
const authMiddleware = require("../middlewares/authMiddleware");
const isManagerAuthMiddleware = require("../middlewares/isManagerMiddleware");

const router = express.Router();

router.post(
  "/",
  [
    check("title")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập tiêu đề"),
    check("description")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập mô tả"),
  ],
  authMiddleware,
  isManagerAuthMiddleware,
  createNewCategory
);

router.put(
  "/normal",
  authMiddleware,
  isManagerAuthMiddleware,
  setNormalCategories
);

router.put(
  "/toggle-status",
  authMiddleware,
  isManagerAuthMiddleware,
  toggleCategoryStatus
);

router.get("/", getCategories);

module.exports = router;
