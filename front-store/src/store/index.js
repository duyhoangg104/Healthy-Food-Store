/** @format */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./services/auth";
import { userApi } from "./services/users";
import { orderApi } from "./services/orders";
import { categoryApi, productApi } from "./services/products";
import { couponApi } from "./services/coupons";
import { mealApi } from "./services/meal";
import uiReducer from "./slice/uiSlice";
import adminReducer from "./slice/adminSlice";
import productReducer from "./slice/productSlice";
import cartReducer from "./slice/cartSlice";
import tdeeReducer from "./slice/tdeeSlice";
import mealReducer from "./slice/mealSlice";
import globalReducer from "./slice/globalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    admin: adminReducer,
    product: productReducer,
    cart: cartReducer,
    tdee: tdeeReducer,
    meal: mealReducer,
    global: globalReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [mealApi.reducerPath]: mealApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(categoryApi.middleware)
      .concat(productApi.middleware)
      .concat(orderApi.middleware)
      .concat(mealApi.middleware)
      .concat(couponApi.middleware),
  devTools: process.env.NODE_ENV === "production" ? false : true,
});

setupListeners(store.dispatch);
