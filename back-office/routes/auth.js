/** @format */

const express = require("express");
const { check } = require("express-validator");
const { register, login } = require("../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  [
    check("email")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập e-mail")
      .isEmail()
      .normalizeEmail()
      .withMessage("Vui lòng nhập e-mail theo đúng định dạng"),
    check("fullName")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập họ tên"),
    check("phone")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng cung cấp số điện thoại"),
  ],
  register
);

router.post(
  "/login",
  [
    check("email")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập e-mail")
      .isEmail()
      .normalizeEmail()
      .withMessage("Vui lòng nhập e-mail theo đúng định dạng"),
    check("password")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập mật khẩu"),
  ],
  login
);

module.exports = router;
