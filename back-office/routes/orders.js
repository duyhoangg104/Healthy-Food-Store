/** @format */

const express = require("express");
const { check } = require("express-validator");
const {
  createNewOrder,
  getAllPendingOrders,
  assignOrderToShipper,
  getOrderDetail,
  getMyWaitingOrders,
  getMyShippingOrders,
  shipAssignedOrder,
  rejectAssignedOrder,
  completeAssignedOrder,
  getMyOrderHistory,
  removeOrderHistory,
  getMyShippedOrders,
  payAnOrderByPaypalPlatform,
  paidAnOrderByPaypalPlatform,
  getCustomerOrdersHistory,
  getReportOrders,
  cancelOrder,
} = require("../controllers/orders");
const authMiddleware = require("../middlewares/authMiddleware");
const isEmployeeMiddleware = require("../middlewares/isEmployeeMiddleware");
const isShipperMiddleware = require("../middlewares/isShipperMiddleware");
const isManagerMiddleware = require("../middlewares/isManagerMiddleware");

const router = express.Router();

router.post(
  "/",
  [
    check("products")
      .isArray({
        min: 1,
      })
      .withMessage("Vui lòng chọn sản phẩm"),
    check("deliveryAddress").custom((value) => {
      if (!value.name || !value.address || !value.address) {
        return Promise.reject("Vui lòng nhập đầy đủ thông tin người nhận");
      }
      return true;
    }),
    check("total").isInt({ min: 0 }).withMessage("Vui lòng chọn sản phẩm"),
  ],
  authMiddleware,
  createNewOrder
);

router.get(
  "/pending",
  authMiddleware,
  isEmployeeMiddleware,
  getAllPendingOrders
);

router.get("/waiting", authMiddleware, isShipperMiddleware, getMyWaitingOrders);

router.get(
  "/shipping",
  authMiddleware,
  isShipperMiddleware,
  getMyShippingOrders
);

router.get("/shipped", authMiddleware, isShipperMiddleware, getMyShippedOrders);

router.get("/reported", authMiddleware, isManagerMiddleware, getReportOrders);

router.get(
  "/customer-orders/:customerId",
  authMiddleware,
  isManagerMiddleware,
  getCustomerOrdersHistory
);

router.put(
  "/assign",
  [
    check("orderId")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng chọn đơn hàng"),
    check("shipperId")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng chọn shipper"),
  ],
  authMiddleware,
  isEmployeeMiddleware,
  assignOrderToShipper
);

router.put(
  "/shipping",
  [
    check("orderId")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng chọn đơn hàng"),
  ],
  authMiddleware,
  isShipperMiddleware,
  shipAssignedOrder
);

router.put(
  "/reject",
  [
    check("orderId")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng chọn đơn hàng"),
  ],
  authMiddleware,
  isShipperMiddleware,
  rejectAssignedOrder
);

router.put(
  "/complete",
  [
    check("orderId")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng chọn đơn hàng"),
  ],
  authMiddleware,
  isShipperMiddleware,
  completeAssignedOrder
);

router.delete("/remove", authMiddleware, removeOrderHistory);

router.post(
  "/pay",
  [
    check("orderId")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng chọn đơn hàng"),
  ],
  authMiddleware,
  payAnOrderByPaypalPlatform
);

router.put(
  "/paid",
  [
    check("paymentId")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Loi xay ra. Vui long thu lai"),
  ],
  paidAnOrderByPaypalPlatform
);

router.put(
  "/cancel",
  [
    check("orderId")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Vui lòng chọn đơn hàng"),
  ],
  authMiddleware,
  cancelOrder
);

router.get("/:id", authMiddleware, isEmployeeMiddleware, getOrderDetail);

router.get("/", authMiddleware, getMyOrderHistory);

module.exports = router;
