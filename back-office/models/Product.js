/** @format */

const mongoose = require("mongoose");
const User = require("./User");

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "https://wtop.com/wp-content/uploads/2020/06/HEALTHYFRESH.jpg",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
    },
    description: {
      type: String,
    },
    origin: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    calor: {
      type: Number,
      required: true,
      min: 0,
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isActivated: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["normal", "combo"],
      default: "normal",
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({
  "$**": "text",
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
