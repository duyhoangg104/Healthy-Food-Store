/** @format */

const { connect } = require("mongoose");
const chalk = require("chalk");

const connectToDb = () => {
  connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      ssl: process.env.NODE_ENV === "production" ? true : false,
      sslValidate: false,
      keepAlive: true,
      keepAliveInitialDelay: 100000,
    }
  )
    .then(() => {
      console.log(chalk.blue(`DB connected success!`));
    })
    .catch((err) => {
      console.log(err);
      process.exitCode = 1;
    });
};

module.exports = connectToDb;
