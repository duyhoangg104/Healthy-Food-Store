/** @format */

const express = require("express");
const { check } = require("express-validator");
const {
  createProduct,
  getProducts,
  getProductDetail,
  updateProduct,
  deleteProduct,
  searchProductsByTitle,
  deactivateProduct,
  setNormalProductsStatus,
  checkProductAcivatedStatus,
} = require("../controllers/products");
const authMiddleware = require("../middlewares/authMiddleware");
const isManagerMiddleware = require("../middlewares/isManagerMiddleware");
const forwardAuthDataMiddleware = require("../middlewares/forwardAuthDataMiddleware");
const errorMessages = require("../constants/messages");

const router = express.Router();

router.post(
  "/",
  [
    check("title")
      .trim()
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập tên món ăn"),
    check("ingredients")
      .trim()
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập nguyên liệu"),
    check("imageUrl")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng cung cấp hình ảnh món ăn"),
    check("category")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập category"),
    check("origin")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập nguồn gốc"),
    check("calor")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập số lượng calor")
      .custom((value) => {
        if (Number(value) < 0) {
          return Promise.reject(
            errorMessages.validateNumberInputMsgMinZero("calor")
          );
        }
        if (Number.isNaN(value)) {
          return Promise.reject(
            errorMessages.validateNumberInputMsgBeNumber("calor")
          );
        }
        return true;
      }),
    check("price")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập giá tiền")
      .custom((value) => {
        if (Number(value) < 0) {
          return Promise.reject(
            errorMessages.validateNumberInputMsgMinZero("giá tiền")
          );
        }
        if (Number.isNaN(value)) {
          return Promise.reject(
            errorMessages.validateNumberInputMsgBeNumber("giá tiền")
          );
        }
        return true;
      }),
  ],
  authMiddleware,
  isManagerMiddleware,
  createProduct
);

router.get("/search", forwardAuthDataMiddleware, searchProductsByTitle);

router.get("/activated/:id", checkProductAcivatedStatus);

router.patch(
  "/toggle/:id",
  authMiddleware,
  isManagerMiddleware,
  deactivateProduct
);

router.put(
  "/set-normal",
  authMiddleware,
  isManagerMiddleware,
  setNormalProductsStatus
);

router.get("/:id", forwardAuthDataMiddleware, getProductDetail);

router.put("/:id", authMiddleware, isManagerMiddleware, updateProduct);

router.delete("/:id", authMiddleware, isManagerMiddleware, deleteProduct);

router.get("/", forwardAuthDataMiddleware, getProducts);

module.exports = router;
