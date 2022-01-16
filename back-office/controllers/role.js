/** @format */

const Role = require("../models/Role");
const errorMessages = require("../constants/messages");
const { validationResult } = require("express-validator");

const createNewRole = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { value } = req.body;

  try {
    const newRole = new Role({
      value,
    });
    const role = await newRole.save();
    return res.status(201).json({
      msg: "Tạo mới role thành công",
      role,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const getRoles = async (_, res) => {
  let query = {
    value: { $ne: "admin" },
  };

  try {
    roles = await Role.find(query);

    return res.json(roles || []);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const setNormalCategories = async (_, res) => {
  try {
    await Category.updateMany(
      {
        status: undefined,
      },
      { status: "normal" }
    );
    res.json({
      msg: "Success",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

module.exports = {
  createNewRole,
  getRoles,
  setNormalCategories,
};
