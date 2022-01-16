import axios from "../axios";

export const createCouponRequest = async (data) =>
  axios.post("/coupons", data, {
    headers: {
      "Content-type": "application/json",
    },
  });

export const toggleCouponActivatedStatusRequest = async (couponId, status) =>
  axios.put(`/coupons/toggle/${couponId}?status=${status}`);

export const applyCouponRequest = async (couponId, orderId) =>
  axios.put(`/coupons/apply/${couponId}?orderId=${orderId}`);
