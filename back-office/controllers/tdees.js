/** @format */

const TdeeIndex = require("../models/TdeeIndex");
const errorMessages = require("../constants/messages");
const { validationResult } = require("express-validator");

const createTdeeIndex = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { gender, age, weight, height, actionIndex, bodyFat } = req.body;

  let existTdee;

  try {
    existTdee = await TdeeIndex.findOne({
      user: req.id,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }

  try {
    const bmiScore = weight / Math.pow(height / 100, 2);
    let lbm = 0;
    if (bodyFat) {
      lbm = (weight * (100 - Number(bodyFat))) / 100;
    }
    if (!bodyFat) {
      let genderFirstConstant = gender === "male" ? 0.407 : 0.252;
      let genderSecondConstant = gender === "male" ? 0.267 : 0.472;
      let genderThirdConstant = gender === "male" ? 19.2 : 48.3;

      lbm =
        genderFirstConstant * weight +
        genderSecondConstant * height -
        genderThirdConstant;
    }

    const bmr = 370 + 21.6 * lbm;

    const tdee = bmr * actionIndex;

    if (existTdee) {
      existTdee.gender = gender;
      existTdee.age = age;
      existTdee.weight = weight;
      existTdee.height = height;
      existTdee.actionIndex = actionIndex;
      existTdee.bodyFat = bodyFat;
      existTdee.bmiScore = bmiScore;
      existTdee.lbm = lbm;
      existTdee.tdee = tdee;
      existTdee.bmr = bmr;

      await existTdee.save();

      return res.json({
        msg: "Thông tin TDEE của bạn đã được tính toán lại",
        newTdee: existTdee,
      });
    }

    const newTdeeIndex = new TdeeIndex({
      gender,
      age,
      weight,
      height,
      actionIndex,
      user: req.id,
      bodyFat,
      bmiScore,
      lbm,
      tdee,
      bmr,
    });

    const newTdee = await newTdeeIndex.save();

    return res.status(201).json({
      msg: "Tạo mới chỉ số TDEE thành công",
      newTdee,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const getMyTdeeIndex = async (req, res) => {
  try {
    const myTdee = await TdeeIndex.findOne({ user: req.id });

    if (!myTdee) {
      return res.status(404).json({
        msg: "Bạn chưa có dữ liệu TDEE",
      });
    }

    return res.json(myTdee);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

module.exports = {
  createTdeeIndex,
  getMyTdeeIndex,
};
