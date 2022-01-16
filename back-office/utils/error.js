/** @format */

const CustomError = require("../models/Error");
const { validationResult } = require("express-validator");
const errorMessages = require("../constants/messages");

function errorHandler(err, _, res, next) {
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }
  const error = new CustomError(err.message || errorMessages.systemErrorMsg);

  return res.status(500).json(error);
}

function checkErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  return next();
}

module.exports = { errorHandler, checkErrors };
