/** @format */

const bcrypt = require("bcrypt");

const checkPassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

module.exports = { checkPassword };
