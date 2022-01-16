import axios from "../axios";

export const createOrderRequest = async (data) => {
  return axios.post("/orders", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const assignOrderToShipperRequest = async (data) => {
  return axios.put("/orders/assign", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const handleAssignedOrderRequest = async (data, type) => {
  return axios.put(`/orders/${type}`, data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const removeOrderHistoryRequest = async (data) => {
  return axios.delete(`/orders/remove?ids=${data.join(",")}`);
};

export const createOrderPaymentRequest = async (data) => {
  return axios.post("/orders/pay", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const paidAnOrderRequest = async (data) => {
  return axios.put("/orders/paid", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const getPendingOrdersByOrderIdQueryRequest = async (orderIdQuery) => {
  return axios.get(`/orders/pending?query=${orderIdQuery}`);
};

export const cancelOrderRequest = async (data) =>
  axios.put("/orders/cancel", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
