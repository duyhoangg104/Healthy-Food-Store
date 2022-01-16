/** @format */

const errorMessages = require("../constants/messages");

const isManagerAuthMiddleware = (req, res, next) => {
  if (req.role !== "manager") {
    return res.status(403).json({
      msg: errorMessages.unAuthorized,
    });
  }
  next();
};

module.exports = isManagerAuthMiddleware;
