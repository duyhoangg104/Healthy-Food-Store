/** @format */

const express = require("express");
const { check } = require("express-validator");
const {
  getUserProfile,
  verifyEmail,
  resetPassword,
  getUserList,
  createNewUser,
  getUserById,
  updateMyProfile,
  updatePassword,
  getCustomerList,
  addProductToFavoriteList,
  getMyWishList,
  deleteUser,
  removeProductFromFavoriteList,
  getShipperList,
  confirmRegisterAccount,
  getEmployeeList,
  updateShippingAddressInfo,
  updateUserProfile,
  searchUsersByName,
} = require("../controllers/users");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdminMiddleware = require("../middlewares/isAdminMiddleware");
const isManagerMiddleware = require("../middlewares/isManagerMiddleware");
const isEmployeeMiddleware = require("../middlewares/isEmployeeMiddleware");
const deactivateAuthMiddleware = require("../middlewares/deactivateAuthMiddleware");

const router = express.Router();

router.get("/me", authMiddleware, getUserProfile);

router.post(
  "/verify-email",
  [
    check("email")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập e-mail")
      .isEmail()
      .normalizeEmail()
      .withMessage("Vui lòng nhập e-mail theo đúng định dạng"),
  ],
  verifyEmail
);

router.put(
  "/reset-password",
  [
    check("code")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập mã OTP"),
    check("password")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập mật khẩu")
      .isLength({ min: 8, max: 32 })
      .withMessage("Mật khẩu phải có độ dài từ 8 đến 32 ký tự"),
  ],
  resetPassword
);

router.put(
  "/confirm-register",
  [
    check("code")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập mã OTP")
      .isLength({ min: 6, max: 6 })
      .withMessage("Mã OTP phải có độ dài 6 ký tự"),
    check("email")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập e-mail")
      .isEmail()
      .normalizeEmail()
      .withMessage("Vui lòng nhập e-mail theo đúng định dạng"),
  ],
  confirmRegisterAccount
);

router.get("/list", authMiddleware, isAdminMiddleware, getUserList);

router.get("/customers", authMiddleware, isManagerMiddleware, getCustomerList);

router.get("/shippers", authMiddleware, isEmployeeMiddleware, getShipperList);

router.get("/employees", authMiddleware, isManagerMiddleware, getEmployeeList);

router.post(
  "/new",
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
  authMiddleware,
  isAdminMiddleware,
  createNewUser
);

router.get("/user/:id", authMiddleware, isAdminMiddleware, getUserById);

router.delete(
  "/user/:id",
  authMiddleware,
  deactivateAuthMiddleware,
  deleteUser
);

router.put(
  "/user/:id",
  [
    check("fullName")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập họ tên"),
    check("phone")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng cung cấp số điện thoại"),
  ],
  authMiddleware,
  isAdminMiddleware,
  updateUserProfile
);

router.put(
  "/edit",
  [
    check("fullName")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập họ tên"),
    check("phone")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng cung cấp số điện thoại"),
  ],
  authMiddleware,
  updateMyProfile
);

router.put(
  "/edit-password",
  [
    check("password")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập mật khẩu hiện tại"),
    check("newPassword")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng cung cấp mật khẩu mới")
      .isLength({ min: 8, max: 32 })
      .withMessage("Mật khẩu phải có độ dài từ 8 đến 32 ký tự"),
  ],
  authMiddleware,
  updatePassword
);

router.put(
  "/edit-address",
  [
    check("name")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập họ và tên người nhận"),
    check("phone")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng cung cấp SDT"),
    check("address")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập địa chỉ"),
  ],
  authMiddleware,
  updateShippingAddressInfo
);

router.put(
  "/favorites",
  [
    check("product")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng chọn sản phẩm"),
  ],
  authMiddleware,
  addProductToFavoriteList
);

router.put(
  "/unfavorite",
  [
    check("product")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng chọn sản phẩm"),
  ],
  authMiddleware,
  removeProductFromFavoriteList
);

router.get("/favorites", authMiddleware, getMyWishList);

router.get("/search", authMiddleware, isManagerMiddleware, searchUsersByName);

module.exports = router;
