const express = require("express");
const { check } = require("express-validator");
const {
  createNewCouponCode,
  getListCoupon,
  toggleCouponCodeActivatedStatus,
  updateApplyCouponData,
} = require("../controllers/coupons");
const authMiddleware = require("../middlewares/authMiddleware");
const isManagerMiddleware = require("../middlewares/isManagerMiddleware");

const router = express.Router();

router.post(
  "/",
  [
    check("value")
      .notEmpty({
        ignore_whitespace: true,
      })
      .withMessage("Vui lòng nhập mã giảm giá"),
  ],
  authMiddleware,
  isManagerMiddleware,
  createNewCouponCode
);

router.put(
  "/toggle/:id",
  authMiddleware,
  isManagerMiddleware,
  toggleCouponCodeActivatedStatus
);

router.put("/apply/:id", authMiddleware, updateApplyCouponData);

router.get("/", authMiddleware, getListCoupon);

module.exports = router;
