/** @format */

const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectToDb = require("./config/db");
const cors = require("cors");
// const { createProxyMiddleware } = require("http-proxy-middleware");

dotenv.config();

const { errorHandler } = require("./utils/error");

const app = express();

// middlewares

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [
            process.env.FRONT_APP_URL_PROD,
            "https://healthyfoodstore.netlify.app",
          ]
        : process.env.FRONT_APP_URL,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "OPTIONS", "PATCH"],
  })
);
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(
//   "/",
//   createProxyMiddleware({
//     target: "http://www.healthyfoodstore.com",
//     changeOrigin: true,
//   })
// );

// routes

app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/users", require("./routes/users"));
app.use("/api/v1/categories", require("./routes/categories"));
app.use("/api/v1/products", require("./routes/products"));
app.use("/api/v1/tdees", require("./routes/tdees"));
app.use("/api/v1/orders", require("./routes/orders"));
app.use("/api/v1/meals", require("./routes/meals"));
app.use("/api/v1/role", require("./routes/role"));
app.use("/api/v1/coupons", require("./routes/coupons"));

app.get("/", (_, res) => {
  return res.send("Hello from api");
});

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

connectToDb();

app.listen(PORT, () => {
  console.log(
    chalk.yellow(`Server is running on PORT http://localhost:${PORT}`)
  );
});

process.on("SIGTERM", () => console.log("Kill process"));
