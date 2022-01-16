/** @format */

const User = require("../models/User");
const errorMessages = require("../constants/messages");
const sgMail = require("@sendgrid/mail");
const otpGenerator = require("otp-generator");
const { checkPassword } = require("../utils/helper");
const Product = require("../models/Product");
const Role = require("../models/Role");
const { validationResult } = require("express-validator");
const { vietnamesePhoneNumberRegex } = require("../constants/regex");

const getUserProfile = async (req, res) => {
  let userInfo;
  try {
    userInfo = await User.findById(req.id)
      .populate("role", "_id value")
      .select("-password -resetPasswordTimes -confirmRegisterToken");
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
  if (!userInfo) {
    return res.status(404).json({
      msg: "Không tìm thấy thông tin người dùng",
    });
  }
  return res.json(userInfo);
};

const verifyEmail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  let existingUser;

  try {
    existingUser = await User.findOne({ email: req.body.email });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }

  if (!existingUser) {
    return res.status(404).json({
      msg: "Không tìm thấy email",
    });
  }

  const generatedOtpCode = otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
    digits: true,
  });

  const mailOptions = {
    from: process.env.SEND_GRID_FROM_EMAIL,
    to: existingUser.email,
    subject: "Đổi mật khẩu",
    text: `Mã xác nhận OTP ${generatedOtpCode}`,
  };

  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

  try {
    await User.findOneAndUpdate(
      { email: existingUser.email },
      {
        resetPasswordToken: generatedOtpCode,
        resetPasswordExpiredAt: new Date(new Date().getTime() + 30 * 60 * 1000),
      }
    );
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }

  sgMail
    .send(mailOptions)
    .then(() => {
      return res.json({
        msg: "Vui lòng kiểm tra e-mail",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        msg: error.message || errorMessages.systemErrorMsg,
      });
    });
};

const resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { code, password } = req.body;

  let user;

  try {
    user = await User.findOne({
      resetPasswordToken: code,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }

  if (!user) {
    return res.status(404).json({
      msg: "Mã xác thực không chính xác. Vui lòng kiểm tra lại email",
    });
  }

  const isExpired =
    new Date().getTime() > new Date(user.resetPasswordExpiredAt).getTime();

  if (isExpired) {
    try {
      user.resetPasswordToken = null;
      user.resetPasswordExpiredAt = null;
      await user.save();
      return res.status(400).json({
        msg: "Phiên hết hạn. Vui lòng xác nhận lại e-mail",
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message || errorMessages.systemErrorMsg,
      });
    }
  }

  user.password = password;
  user.resetPasswordToken = null;
  user.resetPasswordExpiredAt = null;
  user.resetPasswordTimes = user.resetPasswordTimes + 1;

  try {
    await user.save();
    return res.json({
      msg: "Đổi mật khẩu thành công",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const confirmRegisterAccount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { code, email } = req.body;

  let user;

  try {
    user = await User.findOne({
      confirmRegisterToken: code,
      email,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }

  if (!user) {
    return res.status(404).json({
      msg: "Sai mã OTP. Vui lòng thử lại",
    });
  }

  try {
    await User.findOneAndUpdate(
      { confirmRegisterToken: code, email },
      {
        confirmRegisterToken: null,
        verified: true,
      },
      {
        new: true,
      }
    );
    return res.json({
      msg: "Xác nhận đăng ký tài khoản thành công",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const getUserList = async (req, res) => {
  const { role, nameQuery } = req.query;

  let users = [];

  const query = {};

  const roles = await Role.find({});

  let roleArr = roles
    .filter((roleItem) => roleItem.value !== "admin")
    .map((filteredRoleItem) => filteredRoleItem._id);

  if (role) {
    roleArr = [role];
    query.role = {
      $in: roleArr,
    };
  }

  if (nameQuery) {
    if (nameQuery.includes("@")) {
      query.email = {
        $regex: nameQuery,
        $options: "i",
      };
    } else {
      query.fullName = {
        $regex: nameQuery,
        $options: "i",
      };
    }
  }

  try {
    users = await User.find(query).select(
      "-password -resetPasswordTimes -confirmRegisterToken"
    );
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }

  return res.json({ users });
};

const getCustomerList = async (_, res) => {
  let users = [];
  try {
    const customerRole = await Role.findOne({ value: "customer" });

    let roleArr = [customerRole._id];

    users = await User.find({
      role: {
        $in: roleArr,
      },
    }).select("-password -resetPasswordTimes -confirmRegisterToken");
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }

  return res.json(users || []);
};

const getShipperList = async (req, res) => {
  let users = [];

  try {
    const shipperRole = await Role.findOne({ value: "shipper" });

    let roleArr = [shipperRole._id];
    users = await User.find({
      role: {
        $in: roleArr,
      },
    }).select("_id fullName");
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }

  return res.json(users || []);
};

const getEmployeeList = async (req, res) => {
  let users = [];

  try {
    const employeeRole = await Role.findOne({ value: "employee" });

    let roleArr = [employeeRole._id];
    users = await User.find({
      role: {
        $in: roleArr,
      },
    }).select("_id fullName");
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }

  return res.json(users || []);
};

const createNewUser = async (req, res) => {
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
        msg: "E-mail đã tồn tại. Vui lòng thử lại",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
  try {
    const newUser = new User({
      email,
      fullName,
      phone,
      password,
      imageUrl,
      gender,
      birthDate,
      role,
      verified: true,
    });
    const user = await newUser.save();
    user.password = undefined;
    return res.status(201).json({
      msg: "Tạo mới tài khoản thành công",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const getUserById = async (req, res) => {
  let userInfo;
  try {
    userInfo = await User.findById(req.params.id).select(
      "-password -resetPasswordTimes -confirmRegisterToken"
    );
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
  if (!userInfo) {
    return res.status(404).json({
      msg: "Không tìm thấy thông tin người dùng",
    });
  }
  return res.json(userInfo);
};

const deleteUser = async (req, res) => {
  const { newStatus } = req.query;
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        isActivated: newStatus === "true" ? true : false,
      }
    );
    return res.status(202).json({
      msg: "Cập nhật trạng thái người dùng thành công",
      deletedUserId: req.params.id,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const updateMyProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { fullName, phone, gender, birthDate, address } = req.body;
  const updatedData = {
    fullName,
    phone,
    gender,
    birthDate,
  };
  if (req.role === "customer") {
    updatedData.address = address;
  }
  try {
    const user = await User.findOneAndUpdate({ _id: req.id }, updatedData, {
      new: true,
    }).select("-password -resetPasswordTimes -confirmRegisterToken");
    if (!user) {
      return res.status(403).json({
        msg: "Cập nhật thông tin thất bại. Vui lòng thử lại",
      });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const updatePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { password, newPassword } = req.body;
  try {
    const user = await User.findById(req.id);

    if (!user) {
      return res.status(404).json({
        msg: "Người dùng không tồn tại",
      });
    }

    const isMatched = await checkPassword(password, user.password);

    if (!isMatched) {
      return res.status(403).json({
        msg: "Mật khẩu hiện tại không đúng",
      });
    }

    user.password = newPassword;
    user.resetPasswordTimes = user.resetPasswordTimes + 1;

    await user.save();

    return res.json({
      msg: "Đổi mật khẩu thành công",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const addProductToFavoriteList = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { product } = req.body;

  let findedProduct;

  let findedUser;

  try {
    findedProduct = await Product.findById(product);
    findedUser = await User.findById(req.id);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }

  if (!findedProduct || !findedUser) {
    return res.status(403).json({
      msg: "Lỗi xảy ra, Vui lòng thử lại",
    });
  }

  if (
    findedUser.favorites.includes(product) ||
    findedProduct.favorites.includes(req.id)
  ) {
    return res.status(403).json({
      msg: "Sản phẩm đã thêm vào danh sách ưa thích",
    });
  }

  try {
    const session = await User.startSession();

    await session.withTransaction(() => {
      return User.findOneAndUpdate(
        { _id: req.id },
        {
          $push: { favorites: product },
        },
        { session: session }
      );
    });

    await session.withTransaction(() => {
      return Product.findOneAndUpdate(
        { _id: product },
        {
          $push: { favorites: req.id },
        },
        { session: session }
      );
    });
    session.endSession();

    return res.json({
      msg: "Thêm vào danh sách ưa thích",
      product,
      user: req.id,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const getMyWishList = async (req, res) => {
  try {
    const user = await User.findById(req.id).populate(
      "favorites",
      "_id title ingredients imageUrl category description origin price calor favorites isActivated"
    );

    return res.json(user.favorites || []);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const removeProductFromFavoriteList = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { product } = req.body;

  let findedProduct;

  let findedUser;

  try {
    findedProduct = await Product.findById(product);
    findedUser = await User.findById(req.id);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }

  if (!findedProduct || !findedUser) {
    return res.status(403).json({
      msg: "Lỗi xảy ra, Vui lòng thử lại",
    });
  }

  if (
    !findedUser.favorites.includes(product) ||
    !findedProduct.favorites.includes(req.id)
  ) {
    return res.status(403).json({
      msg: "Sản phẩm chưa được thêm hoặc đã bị xóa khỏi danh sách ưa thích",
    });
  }

  try {
    const session = await User.startSession();

    await session.withTransaction(() => {
      return User.findOneAndUpdate(
        { _id: req.id },
        {
          $pull: { favorites: product },
        },
        { session: session }
      );
    });

    await session.withTransaction(() => {
      return Product.findOneAndUpdate(
        { _id: product },
        {
          $pull: { favorites: req.id },
        },
        { session: session }
      );
    });
    session.endSession();

    return res.json({
      msg: "Xóa bỏ sản phẩm khỏi danh sách ưa thích",
      product,
      user: req.id,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const updateShippingAddressInfo = async (req, res) => {
  res.set("Cache-control", "public, max-age=0");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { name, phone, address } = req.body;

  try {
    await User.findByIdAndUpdate(req.id, {
      fullName: name,
      phone,
      address,
    });

    return res.json({
      msg: "Cập nhật thông tin địa chỉ thành công",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const updateUserProfile = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  let foundUser;

  try {
    foundUser = await User.findById(req.params.id).select(
      "-password -resetPasswordTimes -confirmRegisterToken"
    );
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }

  if (!foundUser) {
    return res.status(404).json({
      msg: "Người dùng không tồn tại",
    });
  }

  const { fullName, phone, gender, role, birthDate, password } = req.body;

  fullName ? (foundUser.fullName = fullName) : null;

  phone ? (foundUser.phone = phone) : null;

  gender ? (foundUser.gender = gender) : null;

  role ? (foundUser.role = role) : null;

  birthDate ? (foundUser.birthDate = birthDate) : null;

  !!password ? (foundUser.password = password) : null;

  try {
    await foundUser.save();

    return res.json({ user: foundUser, msg: "Thay đổi thông tin thành công" });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const searchUsersByName = async (req, res) => {
  const { q } = req.query;

  const customerRole = await Role.findOne({ value: "customer" });

  let query = {
    role: customerRole._id,
  };

  if (q) {
    if (q.includes("@")) {
      query.email = {
        $regex: q,
        $options: "i",
      };
    } else {
      query.fullName = {
        $regex: q,
        $options: "i",
      };
    }
  }

  let users = [];

  try {
    users = await User.find(query).select(
      "-password -resetPasswordTimes -confirmRegisterToken"
    );

    return res.json(users);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

module.exports = {
  getUserProfile,
  verifyEmail,
  resetPassword,
  getUserList,
  createNewUser,
  getUserById,
  updateMyProfile,
  updatePassword,
  getCustomerList,
  addProductToFavoriteList,
  getMyWishList,
  deleteUser,
  removeProductFromFavoriteList,
  getShipperList,
  confirmRegisterAccount,
  getEmployeeList,
  updateShippingAddressInfo,
  updateUserProfile,
  searchUsersByName,
};
