const { validationResult } = require("express-validator");
const Coupon = require("../models/Coupon");

const createNewCouponCode = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { value, type, percent, expiredDate, id } = req.body;

  if (id) {
    try {
      const updatedCoupon = await Coupon.findOneAndUpdate(
        { _id: id },
        {
          value,
          type,
          percent,
          expiredDate,
        }
      );
      return res.json({
        msg: "Chỉnh sửa mã giảm giá thành công",
        updatedCoupon,
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message || errorMessages.systemErrorMsg,
      });
    }
  }

  const newCoupon = new Coupon({
    value,
    type,
    percent,
    expiredDate,
    createdBy: req.id,
  });

  try {
    await newCoupon.save();

    return res.status(201).json({
      msg: "Tạo mới mã giảm giá thành công",
      newCoupon,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const toggleCouponCodeActivatedStatus = async (req, res) => {
  const { status } = req.query;
  const { id } = req.params;

  try {
    await Coupon.findOneAndUpdate(
      { _id: id },
      {
        isActivated: status === "true" ? false : true,
      }
    );
    return res.json({
      msg:
        status === "true" ? "Khóa mã giảm giá này" : "Mở khóa mã giảm giá này",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const getListCoupon = async (req, res) => {
  let coupons = [];

  const query = {};

  if (req?.role === "customer") {
    query.isActivated = true;
  }

  try {
    coupons = await Coupon.find(query);

    return res.json(coupons);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const updateApplyCouponData = async (req, res) => {
  const { id: userId } = req;
  const { id } = req.params;
  const { orderId } = req.query;

  try {
    await Coupon.findOneAndUpdate(
      { _id: id },
      {
        $push: { appliedUsers: userId, appliedOrders: orderId },
      }
    );
    return res.json({
      msg: "Chỉnh sửa mã giảm giá thành công",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

module.exports = {
  createNewCouponCode,
  getListCoupon,
  toggleCouponCodeActivatedStatus,
  updateApplyCouponData,
};
