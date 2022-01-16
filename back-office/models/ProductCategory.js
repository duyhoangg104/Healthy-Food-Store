/** @format */

const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductCategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
      default: "https://wtop.com/wp-content/uploads/2020/06/HEALTHYFRESH.jpg",
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

const ProductCategory = mongoose.model(
  "ProductCategory",
  ProductCategorySchema
);

module.exports = ProductCategory;
