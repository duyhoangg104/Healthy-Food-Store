/** @format */

const express = require("express");
const { check } = require("express-validator");
const { createTdeeIndex, getMyTdeeIndex } = require("../controllers/tdees");
const authMiddleware = require("../middlewares/authMiddleware");
const errorMessages = require("../constants/messages");

const router = express.Router();

router.post(
  "/",
  [
    check("gender")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng chọn giới tính"),
    check("age")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập tuổi của bạn")
      .custom((value) => {
        if (Number(value) < 0) {
          return Promise.reject(
            errorMessages.validateNumberInputMsgMinZero("tuổi của bạn")
          );
        }
        if (Number.isNaN(value)) {
          return Promise.reject(
            errorMessages.validateNumberInputMsgBeNumber("tuổi của bạn")
          );
        }
        return true;
      }),
    check("weight")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập cân nặng của bạn")
      .custom((value) => {
        if (Number(value) < 0) {
          return Promise.reject(
            errorMessages.validateNumberInputMsgMinZero("cân nặng của bạn")
          );
        }
        if (Number.isNaN(value)) {
          return Promise.reject(
            errorMessages.validateNumberInputMsgBeNumber("cân nặng của bạn")
          );
        }
        return true;
      }),
    check("height")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập chiều cao của bạn")
      .custom((value) => {
        if (Number(value) < 0) {
          return Promise.reject(
            errorMessages.validateNumberInputMsgMinZero("chiều cao của bạn")
          );
        }
        if (Number.isNaN(value)) {
          return Promise.reject(
            errorMessages.validateNumberInputMsgBeNumber("chiều cao của bạn")
          );
        }
        return true;
      }),
    check("actionIndex")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng chọn mức độ vận động trong ngày của bạn")
      .custom((value) => {
        if (Number(value) < 0) {
          return Promise.reject(
            errorMessages.validateNumberInputMsgMinZero(
              "mức độ vận động trong ngày của bạn"
            )
          );
        }
        if (Number.isNaN(value)) {
          return Promise.reject(
            errorMessages.validateNumberInputMsgBeNumber(
              "mức độ vận động trong ngày của bạn"
            )
          );
        }
        return true;
      }),
  ],
  authMiddleware,
  createTdeeIndex
);

router.get("/", authMiddleware, getMyTdeeIndex);

module.exports = router;
