/** @format */

const errorMessages = require("../constants/messages");

const isEmployeeAuthMiddleware = (req, res, next) => {
  if (req.role !== "employee") {
    return res.status(403).json({
      msg: errorMessages.unAuthorized,
    });
  }
  next();
};

module.exports = isEmployeeAuthMiddleware;
