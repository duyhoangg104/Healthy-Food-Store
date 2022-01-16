const { validationResult } = require("express-validator");
const Order = require("../models/Order");
const sgMail = require("@sendgrid/mail");
const paypal = require("paypal-rest-sdk");

const createNewOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const {
    products,
    paymentMethod,
    deliveryMethod,
    total,
    deliveryAddress,
    coupon,
  } = req.body;

  const newOrder = new Order({
    products,
    paymentMethod,
    deliveryMethod,
    total,
    deliveryAddress,
    coupon,
    createdBy: req.id,
  });

  try {
    const savedOrder = await newOrder.save();
    return res.status(201).json({
      msg: "Đặt hàng thành công. Cảm ơn bạn đã tin tưởng chúng tôi",
      newOrder: savedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const getAllPendingOrders = async (req, res) => {
  const { query: orderIdQuery } = req.query;

  const query = {
    status: { $in: ["pending", "waiting"] },
  };

  try {
    const orders = await Order.find(query);

    if (!orderIdQuery) {
      return res.json(orders);
    }

    return res.json(
      orders.filter((order) => order._id.toString().includes(orderIdQuery))
    );
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const getMyWaitingOrders = async (req, res) => {
  try {
    let orders = [];
    orders = await Order.find({
      status: { $in: ["waiting"] },
      deliveryBy: req.id,
    });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const getMyShippingOrders = async (req, res) => {
  try {
    let orders = [];
    orders = await Order.find({
      status: { $in: ["shipping"] },
      deliveryBy: req.id,
    });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const getMyShippedOrders = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const convertedStartDate = new Date(startDate);

    const convertedEndDate = new Date(endDate);

    const query = {
      status: { $in: ["success"] },
      deliveryBy: req.id,
    };

    if (startDate !== "null" && endDate !== "null") {
      convertedEndDate.setHours(23, 59, 59, 999);

      query.successAt = {
        $gte: convertedStartDate,
        $lte: convertedEndDate,
      };
    }

    const orders = await Order.find(query);

    return res.json(orders || []);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const getReportOrders = async (req, res) => {
  try {
    const { startDate, endDate, employeeId } = req.query;

    const convertedStartDate = new Date(startDate);

    const convertedEndDate = new Date(endDate);

    const query = {
      status: { $in: ["success"] },
    };

    if (employeeId) {
      query.handleBy = employeeId;
    }

    if (startDate !== "null" && endDate !== "null") {
      convertedEndDate.setHours(23, 59, 59, 999);

      query.successAt = {
        $gte: convertedStartDate,
        $lte: convertedEndDate,
      };
    }

    const orders = await Order.find(query);

    return res.json(orders || []);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const getOrderDetail = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        msg: "K tìm thấy đơn hàng",
      });
    }
    return res.json(order);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const assignOrderToShipper = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const { orderId, shipperId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(400).json({
        msg: "Lỗi xảy ra. Vui lòng thử lại",
      });
    }

    if (order.status === "cancel") {
      return res.status(400).json({
        msg: "Đơn hàng đã bị hủy",
      });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      {
        _id: orderId,
        status: "pending",
      },
      {
        status: "waiting",
        deliveryBy: shipperId,
        handleBy: req.id,
      },
      { new: true }
    ).populate("deliveryBy", "_id email");

    if (!updatedOrder) {
      return res.status(400).json({
        msg: "Lỗi xảy ra. Vui lòng thử lại",
      });
    }

    const mailOptions = {
      from: process.env.SEND_GRID_FROM_EMAIL,
      to: updatedOrder.deliveryBy.email,
      subject: "Đơn hàng giao cho bạn",
      text: `Hãy kiểm tra đơn hàng mới nhất`,
      html: `<strong>Đơn hàng mới <a href="${
        process.env.NODE_ENV === "production"
          ? process.env.FRONT_APP_URL_PROD
          : process.env.FRONT_APP_URL
      }/shipper/order-waiting" target="_blank">Xem đơn</a> </strong>`,
    };

    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

    sgMail
      .send(mailOptions)
      .then(() => {
        updatedOrder.deliveryBy = updatedOrder.deliveryBy._id;
        return res.json({ msg: "Giao cho shipper thành công", updatedOrder });
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

const shipAssignedOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const { orderId } = req.body;
    const updatedOrder = await Order.findOneAndUpdate(
      {
        _id: orderId,
      },
      {
        status: "shipping",
        deliveryAt: new Date(),
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(400).json({
        msg: "Lỗi xảy ra. Vui lòng thử lại",
      });
    }

    return res.json({ msg: "Bạn đang ship đơn này", updatedOrder });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const rejectAssignedOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const { orderId } = req.body;
    const updatedOrder = await Order.findOneAndUpdate(
      {
        _id: orderId,
      },
      {
        status: "pending",
        deliveryBy: null,
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(400).json({
        msg: "Lỗi xảy ra. Vui lòng thử lại",
      });
    }

    return res.json({ msg: "Bạn đã từ chối ship đơn này", updatedOrder });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const completeAssignedOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const { orderId } = req.body;
    const updatedOrder = await Order.findOneAndUpdate(
      {
        _id: orderId,
      },
      {
        status: "success",
        successAt: new Date(),
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(400).json({
        msg: "Lỗi xảy ra. Vui lòng thử lại",
      });
    }

    return res.json({ msg: "Giao hàng thành công", updatedOrder });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const getMyOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({
      createdBy: req.id,
      isRemoved: { $ne: true },
    }).select("-paymentId");
    return res.json(orders || []);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const getCustomerOrdersHistory = async (req, res) => {
  const { customerId } = req.params;

  try {
    const orders = await Order.find({
      createdBy: customerId,
      handleBy: { $ne: null },
    })
      .select("-paymentId")
      .populate("handleBy", "fullName _id");
    return res.json(orders || []);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const removeOrderHistory = async (req, res) => {
  try {
    const ids = req.query.ids || "";
    const orders = ids.split(",");
    await Order.updateMany(
      {
        _id: { $in: orders },
      },
      {
        isRemoved: true,
      }
    );

    return res.json({ msg: "Xoa lich su don hang!" });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const payAnOrderByPaypalPlatform = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  let orderDetail;

  try {
    orderDetail = await Order.findById(req.body.orderId);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }

  if (!orderDetail) {
    return res.status(404).json({
      msg: "No order found",
    });
  }

  paypal.configure({
    mode: "sandbox", //sandbox or live,
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_SECRET_TOKEN,
  });

  const create_payment_json = {
    intent: "order",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `${
        process.env.NODE_ENV === "production"
          ? process.env.FRONT_APP_URL_PROD
          : "http://localhost:3000"
      }/order-thanks`,
      cancel_url: `${
        process.env.NODE_ENV === "production"
          ? process.env.FRONT_APP_URL_PROD
          : "http://localhost:3000"
      }/order-cancel`,
    },
    transactions: [
      {
        item_list: {
          items: [],
        },
        amount: {
          currency: "USD",
          total: Math.round(orderDetail.total / 23000),
        },
        description: "Pay an order through paypal",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      return res.status(500).json({
        msg: error.message || errorMessages.systemErrorMsg,
      });
    }

    orderDetail.paymentId = payment.id;

    try {
      orderDetail.save().then(() => {
        return res.json({ redirectUrl: payment?.links?.[1].href });
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message || errorMessages.systemErrorMsg,
      });
    }
  });
};

const paidAnOrderByPaypalPlatform = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  let orderDetail;

  const { paymentId } = req.body;

  try {
    orderDetail = await Order.findOne({ paymentId });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }

  if (!orderDetail) {
    return res.status(404).json({
      msg: "Đơn hàng chưa được thanh toán",
    });
  }

  orderDetail.paidAt = new Date();

  try {
    await orderDetail.save();
    return res.json({
      msg: "Thanh toán đơn hàng thành công",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

const cancelOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const { orderId } = req.body;
    const cancelledOrder = await Order.findOneAndUpdate(
      {
        _id: orderId,
        createdBy: req.id,
      },
      {
        status: "cancel",
      },
      { new: true }
    );

    if (!cancelledOrder) {
      return res.status(400).json({
        msg: "Lỗi xảy ra. Vui lòng thử lại",
      });
    }

    return res.json({ msg: "Bạn đã hủy đơn này", cancelledOrder });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || errorMessages.systemErrorMsg,
    });
  }
};

module.exports = {
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
};
