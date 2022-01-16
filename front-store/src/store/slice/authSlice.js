/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { authUserAction, registerUserAction } from "../actions/auth";
import { updateMyInfoAction, updateMyPasswordAction } from "../actions/users";
import axiosInstance from "../axios";

const initialState = {
  isAuthenticated: localStorage.getItem("login_token") ? true : false,
  isLoading: false,
  error: null,
  success: false,
  authData: localStorage.getItem("login_token")
    ? { token: localStorage.getItem("login_token") }
    : {},
  userInfo: {},
  register: {
    isLoading: false,
    error: null,
    success: false,
    data: {},
  },
  updateInfo: {
    isLoading: false,
    error: null,
    success: false,
  },
  updatePassword: {
    isLoading: false,
    error: null,
    success: false,
    data: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state, { payload }) => {
      state.isAuthenticated = false;
      state.authData = {};
      state.userInfo = {};
      localStorage.removeItem("login_token");
      axiosInstance.defaults.headers.common["authorization"] = null;
      if (payload) {
        payload.push("/");
      }
    },
    resetRegisterState: (state, { payload }) => {
      state.register.success = false;
      if (payload) {
        payload.history.push(`/confirm-register?email=${payload.email}`);
      }
    },
    resetAuthState: (state) => {
      state.success = false;
    },
    resetUpdateMyInfoState: (state) => {
      state.updateInfo.success = false;
    },
    resetUpdateMyPasswordState: (state) => {
      state.updatePassword.success = false;
      state.updatePassword.data = null;
    },
    addProductToWishList: (state, { payload }) => {
      state.userInfo.favorites.push(payload);
    },
    removeProductFromWishList: (state, { payload }) => {
      state.userInfo.favorites = state.userInfo.favorites.filter(
        (favorite) => favorite !== payload
      );
    },
    setFavoritesData: (state, { payload }) => {
      state.userInfo.favorites = payload;
    },
    updateAddressInfo: (state, { payload }) => {
      state.userInfo.address = payload.address;
      state.userInfo.fullName = payload.name;
      state.userInfo.phone = payload.phone;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authUserAction.fulfilled, (state, { payload }) => {
      state.authData = payload;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.error = null;
      state.success = true;
      localStorage.setItem("login_token", payload.token);
      axiosInstance.defaults.headers.common[
        "authorization"
      ] = `Bearer ${payload.token}`;
    });
    builder.addCase(authUserAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(authUserAction.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(registerUserAction.fulfilled, (state, { payload }) => {
      state.register.isLoading = false;
      state.register.success = true;
      state.register.data = payload.data;
    });
    builder.addCase(registerUserAction.pending, (state) => {
      state.register.isLoading = true;
      state.register.error = null;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.register.isLoading = false;
      state.register.error = action.payload;
    });
    builder.addCase(updateMyInfoAction.fulfilled, (state, { payload }) => {
      state.updateInfo.isLoading = false;
      state.updateInfo.success = true;
      state.userInfo = { ...payload, role: state.userInfo.role };
    });
    builder.addCase(updateMyInfoAction.pending, (state) => {
      state.updateInfo.isLoading = true;
      state.updateInfo.error = null;
    });
    builder.addCase(updateMyInfoAction.rejected, (state, action) => {
      state.updateInfo.isLoading = false;
      state.updateInfo.error = action.payload;
    });
    builder.addCase(updateMyPasswordAction.fulfilled, (state, { payload }) => {
      state.updatePassword.isLoading = false;
      state.updatePassword.success = true;
      state.updatePassword.data = payload;
    });
    builder.addCase(updateMyPasswordAction.pending, (state) => {
      state.updatePassword.isLoading = true;
      state.updatePassword.error = null;
    });
    builder.addCase(updateMyPasswordAction.rejected, (state, action) => {
      state.updatePassword.isLoading = false;
      state.updatePassword.error = action.payload;
    });
  },
});

export const {
  logout,
  setUserInfo,
  resetRegisterState,
  resetAuthState,
  resetUpdateMyInfoState,
  resetUpdateMyPasswordState,
  addProductToWishList,
  removeProductFromWishList,
  setFavoritesData,
  updateAddressInfo,
} = authSlice.actions;

export default authSlice.reducer;
