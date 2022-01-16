/** @format */

const User = require("../models/User");
const { validationResult } = require("express-validator");
const { checkPassword } = require("../utils/helper");
const errorMessages = require("../constants/messages");
const { generateJwtToken } = require("../utils/token");
const otpGenerator = require("otp-generator");
const sgMail = require("@sendgrid/mail");

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const {
    email,
    fullName,
    phone,
    password,
    imageUrl,
    gender,
    birthDate,
    role,
  } = req.body;

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser.length) {
      return res.status(403).json({
        msg: "Tài khoản Email đã tồn tại, Vui lòng thử lại",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
  try {
    const generatedOtpCode = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
      digits: true,
    });

    const mailOptions = {
      from: process.env.SEND_GRID_FROM_EMAIL,
      to: email,
      subject: "Xác nhận đăng ký tài khoản",
      text: `Mã xác nhận OTP ${generatedOtpCode}`,
    };

    const newUser = new User({
      email,
      fullName,
      phone,
      password,
      imageUrl,
      gender,
      birthDate,
      confirmRegisterToken: generatedOtpCode,
      role,
    });

    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

    sgMail
      .send(mailOptions)
      .then(async () => {
        await newUser.save();
        return res.status(201).json({
          msg: "Đăng ký thành công, Vui lòng xác nhận e-mail",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          msg: error.message || errorMessages.systemErrorMsg,
        });
      });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email }).populate("role", "_id value");
    if (!existingUser) {
      return res.status(404).json({
        msg: "Tài khoản không tồn tại. Vui lòng thử lại",
      });
    }
    if (!existingUser.isActivated) {
      return res.status(403).json({
        msg: "Tài khoản đã bị khóa. Vui lòng liên hệ Admin để mở khóa tài khoản",
      });
    }
    if (!existingUser.verified) {
      return res.status(403).json({
        msg: "Vui lòng kích hoạt tài khoản bằng e-mail",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }

  const isMatched = checkPassword(password, existingUser.password);

  if (!isMatched) {
    return res.status(403).json({
      msg: "Thông tin đăng nhập không đúng. Vui lòng thử lại",
    });
  }

  const token = generateJwtToken({
    id: existingUser._id,
    role: existingUser.role.value,
  });

  return res.json({ token });
};

module.exports = {
  register,
  login,
};
