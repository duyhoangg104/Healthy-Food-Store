/** @format */

const { decodeJwtToken } = require("../utils/token");
const errorMessages = require("../constants/messages");

const authMiddleware = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.status(401).json({
      msg: errorMessages.unAuthorized,
    });
  }
  const token = bearerToken?.split(" ")?.[1];
  if (!token) {
    return res.status(401).json({
      msg: errorMessages.unAuthorized,
    });
  }

  const decoded = decodeJwtToken(token);

  if (!decoded) {
    return res.status(401).json({
      msg: errorMessages.unAuthorized,
    });
  }

  //  check token has expired or not

  const isExpired = new Date().getTime() > decoded.exp * 1000;

  if (isExpired) {
    return res.status(401).json({
      msg: "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại",
    });
  }

  req.id = decoded.id;
  req.role = decoded.role;

  next();
};

module.exports = authMiddleware;
