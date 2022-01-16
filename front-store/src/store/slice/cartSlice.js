/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { persistCartItemsToStorage } from "../../utils/helper";
import { createOrderAction } from "../actions/orders";

const cartItems = JSON.parse(localStorage.getItem("cartItems"));
const couponCodeStorage = localStorage.getItem("couponCode");

const initialState = {
  list: cartItems || [],
  coupon: couponCodeStorage || "",
  total: cartItems?.reduce((acc, item) => acc + item.price * item.qty, 0) || 0,
  checkout: {
    isLoading: false,
    success: false,
    data: {},
    error: null,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, { payload }) => {
      if (state.list.find((item) => item._id === payload._id)) {
        state.list = state.list.map((item) =>
          item._id === payload._id ? payload : item
        );
      } else {
        state.list.push(payload);
      }
      persistCartItemsToStorage(state.list);
    },
    removeProductFromCart: (state, { payload }) => {
      if (state.list.find((item) => item._id === payload)) {
        state.list = state.list.filter((item) => item._id !== payload);
      }
      state.total = state.list.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      persistCartItemsToStorage(state.list);
    },
    resetCart: (state) => {
      state.list = [];
      state.total = 0;
      state.coupon = "";
      persistCartItemsToStorage(state.list);
      localStorage.removeItem("couponCode");
    },
    calcTotal: (state) => {
      state.total = state.list.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
    },
    setCoupon: (state, { payload }) => {
      state.coupon = payload;
      localStorage.setItem("couponCode", payload);
    },
    resetCheckoutState: (state) => {
      state.checkout.data = {};
      state.checkout.success = false;
    },
    startPaypalPaymentGateway: (state) => {
      state.checkout.isLoading = true;
    },
    endPaypalPaymentGateway: (state) => {
      state.checkout.isLoading = true;
    },
    increaseProductQty: (state, { payload }) => {
      const item = state.list.find((item) => item._id === payload);
      if (item.qty < 100) {
        state.list = state.list.map((item) =>
          item._id === payload ? { ...item, qty: item.qty + 1 } : item
        );
        persistCartItemsToStorage(state.list);
      }
    },
    decreaseProductQty: (state, { payload }) => {
      const item = state.list.find((item) => item._id === payload);
      if (item.qty > 1) {
        state.list = state.list.map((item) =>
          item._id === payload ? { ...item, qty: item.qty - 1 } : item
        );
        persistCartItemsToStorage(state.list);
      }
      if (item.qty === 1) {
        state.list = state.list.filter((item) => item._id !== payload);
        persistCartItemsToStorage(state.list);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrderAction.pending, (state) => {
      state.checkout.isLoading = true;
      state.checkout.error = null;
    });
    builder.addCase(createOrderAction.fulfilled, (state, { payload }) => {
      state.checkout.isLoading = false;
      state.checkout.success = true;
      state.checkout.data = payload;
    });
    builder.addCase(createOrderAction.rejected, (state, { payload }) => {
      state.checkout.isLoading = false;
      state.checkout.error = payload;
    });
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  resetCart,
  calcTotal,
  setCoupon,
  resetCheckoutState,
  increaseProductQty,
  decreaseProductQty,
  startPaypalPaymentGateway,
  endPaypalPaymentGateway,
} = cartSlice.actions;

export default cartSlice.reducer;
