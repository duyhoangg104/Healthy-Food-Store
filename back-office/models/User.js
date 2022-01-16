/** @format */

const mongoose = require("mongoose");
const { DAY_MILI_SECONDS } = require("../constants/date");
const bcrypt = require("bcrypt");
const Product = require("./Product");
const Role = require("./Role");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      maxlength: 50,
    },
    imageUrl: {
      type: String,
      default:
        "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png",
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 32,
    },
    phone: {
      type: String,
      minlength: 10,
      maxlength: 12,
      required: true,
    },
    gender: {
      type: String,
      enum: ["other", "male", "female"],
      default: "other",
    },
    birthDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v && v.getTime() < Date.now() - DAY_MILI_SECONDS * 12 * 365;
        },
        message: "Vui lòng nhập ngày sinh theo đúng định dạng",
      },
    },
    role: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Role",
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    address: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isActivated: {
      type: Boolean,
      default: true,
    },
    confirmRegisterToken: String,
    resetPasswordToken: String,
    resetPasswordExpiredAt: Date,
    resetPasswordTimes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (user.password) {
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

UserSchema.static("findByEmail", function (email) {
  return this.find({ email });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
