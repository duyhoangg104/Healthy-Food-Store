/** @format */

const errorMessages = require("../constants/messages");

const isShipperAuthMiddleware = (req, res, next) => {
  if (req.role !== "shipper") {
    return res.status(403).json({
      msg: errorMessages.unAuthorized,
    });
  }
  next();
};

module.exports = isShipperAuthMiddleware;
