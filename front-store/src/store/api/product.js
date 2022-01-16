/** @format */

import axios from "../axios";

export const createProductRequest = async (data) => {
  return axios.post("/products", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const editProductRequest = async (data) => {
  return axios.put(`/products/${data._id}`, data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const deleteProductRequest = async (id) => {
  return axios.delete(`/products/${id}`);
};

export const toggleProductStatusRequest = async (id, status) => {
  return axios.patch(`/products/toggle/${id}?newStatus=${status}`);
};

export const searchProductByTitleRequest = async (query) =>
  axios.get(`/products/search?q=${query}`);

export const checkProductActivatedStatusRequest = async (id) =>
  axios.get(`/products/activated/${id}`);
