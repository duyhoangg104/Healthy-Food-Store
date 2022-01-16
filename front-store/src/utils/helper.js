/** @format */

import React from "react";
import roles from "../constants/role";

const formatNumberWithZeroPrefix = (num) => {
  const toNumberVal = parseInt(num, 10);
  if (toNumberVal > 9) {
    return num;
  }
  return `0${toNumberVal}`;
};

const renderOptionList = (startNum, endNum) => {
  const options = [];
  for (let i = startNum; i <= endNum; i++) {
    options.push(
      <option key={`${i}`} value={i}>
        {formatNumberWithZeroPrefix(i)}
      </option>
    );
  }
  return options;
};

const convertGenderToVietnamese = (gender) => {
  if (gender === "male") return "Nam";
  if (gender === "female") return "Nữ";
  if (gender === "other") return "Khác";
  return "Khác";
};

const convertRoleToVietnamese = (role) => {
  if (role === roles.MANAGER_ROLE) return "quản lý";
  if (role === roles.ADMIN_ROLE) return "admin";
  if (role === roles.EMPLOYEE_ROLE) return "nhân viên";
  if (role === roles.SHIPPER_ROLE) return "shipper";
  if (role === roles.CUSTOMER_ROLE) return "khách hàng";
  return "";
};

const convertCouponTypeToVietnamese = (role) => {
  if (role === "order") return "Giảm giá đơn hàng";
  if (role === "ship") return "Giảm phí vận chuyển";
  return "";
};

const convertProfilePageTitleToVietnamese = (pageTitle) => {
  if (pageTitle === "tdee") return "";
  if (pageTitle === "profile") return "Thông tin tài khoản";
  if (pageTitle === "orders") return "Lịch sử mua hàng";
  if (pageTitle === "password") return "Đổi mật khẩu";
  return "";
};

const convertDateToSeperatedField = (dateStr = "") => {
  if (!dateStr) {
    return [1930, 1, 1];
  }
  const seperatedFields = dateStr.split("-");
  return [+seperatedFields?.[0], +seperatedFields?.[1], +seperatedFields?.[2]];
};

const formatter = new Intl.NumberFormat("vi-ve", {
  style: "currency",
  currency: "VND",
});
const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

const persistCartItemsToStorage = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const checkProductExistOnCart = (product, cartItems) =>
  cartItems.find((item) => item._id === product._id);

const checkProductExistOnMealList = (product, mealItems) =>
  mealItems.find((item) => item._id === product._id);

const bmiEvaluation = (bmi) => {
  if (bmi <= 18.5) {
    return "Thiếu cân";
  }
  if (bmi > 18.5 && bmi <= 24.99) {
    return "Cân nặng bình thường";
  }
  if (bmi >= 25 && bmi <= 29.99) {
    return "Quá cân";
  }
  if (bmi >= 30) {
    return "Béo phì";
  }
  return "";
};

const activeClassName = (conditionResult, firstClassName, secondClassName) => {
  if (conditionResult) {
    return firstClassName;
  }
  return secondClassName || "";
};

const convertOrderStatusToVietnamese = (status) => {
  if (status === "pending") return "Chờ giao shipper";
  if (status === "waiting") return "Chờ shipper xác nhận";
  if (status === "shipping") return "Đang chuyển hàng";
  if (status === "cancel") return "Hủy bỏ";
  if (status === "success") return "Thành công";
  return "Khác";
};

export {
  renderOptionList,
  formatNumberWithZeroPrefix,
  convertDateToSeperatedField,
  formatter,
  persistCartItemsToStorage,
  checkProductExistOnCart,
  convertGenderToVietnamese,
  numberFormatter,
  bmiEvaluation,
  convertRoleToVietnamese,
  activeClassName,
  checkProductExistOnMealList,
  convertOrderStatusToVietnamese,
  convertCouponTypeToVietnamese,
  convertProfilePageTitleToVietnamese,
};
