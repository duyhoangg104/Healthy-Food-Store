/** @format */
const jwt = require("jsonwebtoken");

const generateJwtToken = (payload) => {
  if (!payload) {
    return null;
  }
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "2h",
  });
};

const decodeJwtToken = (token) => {
  if (!token) {
    return null;
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return null;
  }
  return decoded;
};

module.exports = { generateJwtToken, decodeJwtToken };
