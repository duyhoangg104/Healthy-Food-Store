const mongose = require("mongoose");
const User = require("./User");
const MealProduct = require("./MealProduct");

const { Schema } = mongose;

const MealSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    list: [
      {
        type: Schema.Types.ObjectId,
        ref: "MealProduct",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Meal = mongose.model("Meal", MealSchema);

module.exports = Meal;
