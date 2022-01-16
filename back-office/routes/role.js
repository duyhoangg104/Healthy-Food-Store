/** @format */

const express = require("express");
const { check } = require("express-validator");
const {
  createNewRole,
  getRoles,
  setNormalCategories,
} = require("../controllers/role");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/",
  [
    check("value")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng nhập giá trị"),
  ],
  createNewRole
);

router.put("/normal", authMiddleware, setNormalCategories);

router.get("/", getRoles);

module.exports = router;
