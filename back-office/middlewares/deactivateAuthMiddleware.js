/** @format */

const errorMessages = require("../constants/messages");

const deactivateAuthMiddleware = (req, res, next) => {
  if (req.role !== "admin" && req.role !== "manager") {
    return res.status(403).json({
      msg: errorMessages.unAuthorized,
    });
  }
  next();
};

module.exports = deactivateAuthMiddleware;
