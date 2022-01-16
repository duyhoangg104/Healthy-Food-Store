/** @format */

const mongoose = require("mongoose");
const User = require("./User");

const { Schema } = mongoose;

const TdeeIndexSchema = new Schema(
  {
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
    },
    weight: {
      type: Number,
      min: 5,
      required: true,
    },
    height: {
      type: Number,
      min: 15,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    actionIndex: {
      type: Number,
      required: true,
      enum: [1.2, 1.375, 1.55, 1.725, 1.9],
    },
    bodyFat: {
      type: Number,
      min: 0,
      default: 0,
    },
    bmiScore: {
      type: Number,
      required: true,
    },
    bmr: {
      type: Number,
      required: true,
    },
    lbm: {
      type: Number,
      required: true,
    },
    tdee: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TdeeIndex = mongoose.model("TdeeIndex", TdeeIndexSchema);

module.exports = TdeeIndex;
