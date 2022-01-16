const mongose = require("mongoose");
const Product = require("./Product");
const Meal = require("./Meal");

const { Schema } = mongose;

const MealProductSchema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        qty: {
          type: Number,
          default: 1,
        },
      },
    ],
    meal: {
      type: Schema.Types.ObjectId,
      ref: "Meal",
      required: true,
    },
    title: {
      type: String,
      default: "Default Meal",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MealProduct = mongose.model("MealProduct", MealProductSchema);

module.exports = MealProduct;
