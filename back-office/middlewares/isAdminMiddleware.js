/** @format */

const errorMessages = require("../constants/messages");

const isAdminAuthMiddleware = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({
      msg: errorMessages.unAuthorized,
    });
  }
  next();
};

module.exports = isAdminAuthMiddleware;
