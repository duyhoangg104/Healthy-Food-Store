const mongose = require("mongoose");
const User = require("./User");
const Order = require("./Order");

const { Schema } = mongose;

const CouponSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["order", "ship"],
      default: "order",
    },
    percent: {
      type: Number,
      default: 5,
    },
    expiredDate: {
      type: Date,
      default: Date.now(),
    },
    isActivated: {
      type: Boolean,
      default: true,
    },
    appliedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    appliedOrders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Coupon = mongose.model("Coupon", CouponSchema);

module.exports = Coupon;
