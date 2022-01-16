/** @format */

import axios from "../axios";

export const verifyEmailRequest = async (email) =>
  axios.post(
    "/users/verify-email",
    { email },
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );

export const resetPasswordRequest = async (data) =>
  axios.put("/users/reset-password", data, {
    headers: {
      "Content-type": "application/json",
    },
  });

export const getUserListRequest = async (filterStr = "") => {
  return axios.get(`/users/list${filterStr}`);
};

export const createUserRequest = async (data) => {
  return axios.post("/users/new", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const updateMyInfoRequest = async (data) => {
  return axios.put("/users/edit", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const updateMyPasswordRequest = async (data) => {
  return axios.put("/users/edit-password", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const addProductToWishListRequest = async (product) => {
  return axios.put(
    "/users/favorites",
    { product },
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
};

export const removeProductFromWishListRequest = async (product) => {
  return axios.put(
    "/users/unfavorite",
    { product },
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
};

export const deleteUserRequest = async (uId, isActivated) => {
  return axios.delete(`/users/user/${uId}?newStatus=${isActivated}`);
};

export const confirmRegisterRequest = async (data) => {
  return axios.put("/users/confirm-register", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const updateAddressInfoRequest = async (data) => {
  return axios.put("/users/edit-address", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const updateUserInfoRequest = async (data, id) => {
  return axios.put(`/users/user/${id}`, data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const searchUsersByNameRequest = async (query = "") =>
  axios.get(`/users/search?q=${query}`);
