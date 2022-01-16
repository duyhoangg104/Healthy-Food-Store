/** @format */

const mongoose = require("mongoose");
const User = require("./User");
const Product = require("./Product");

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    deliveryMethod: {
      type: String,
      enum: ["ship", "get"],
      default: "ship",
    },
    deliveryAddress: {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        minlength: 10,
        maxlength: 12,
        required: true,
      },
    },
    coupon: {
      type: String,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        imageUrl: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      min: 1,
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "paypal"],
      default: "cod",
    },
    paymentId: {
      type: String,
    },
    paidAt: {
      type: Date,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "waiting", "shipping", "cancel", "success"],
      default: "pending",
    },
    successAt: {
      type: Date,
    },
    cancelAt: {
      type: Date,
    },
    deliveryBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    handleBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    deliveryAt: {
      type: Date,
    },
    isRemoved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.index({
  "$**": "text",
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
