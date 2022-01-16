/** @format */

const { decodeJwtToken } = require("../utils/token");
const errorMessages = require("../constants/messages");

const forwarchAuthDataMiddleware = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return next();
  } else {
    const token = bearerToken?.split(" ")?.[1];

    if (!token) {
      return res.status(401).json({
        msg: errorMessages.unAuthorized,
      });
    }

    const decoded = decodeJwtToken(token);

    if (!decoded) {
      return next();
    }

    //  check token has expired or not

    const isExpired = new Date().getTime() > decoded.exp * 1000;

    if (isExpired) {
      return next();
    }

    req.id = decoded.id;
    req.role = decoded.role;

    next();
  }
};

module.exports = forwarchAuthDataMiddleware;
