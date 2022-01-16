/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { createProductAction, editProductAction } from "../actions/products";

const initialState = {
  createProduct: {
    isLoading: false,
    error: null,
    success: false,
    data: null,
  },
  editProduct: {
    isLoading: false,
    error: null,
    success: false,
    data: null,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetCreateProductState: (state) => {
      state.createProduct.success = false;
      state.createProduct.data = null;
    },
    resetEditProductState: (state) => {
      state.editProduct.success = false;
      state.editProduct.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProductAction.pending, (state) => {
      state.createProduct.isLoading = true;
      state.createProduct.error = null;
    });
    builder.addCase(createProductAction.fulfilled, (state, { payload }) => {
      state.createProduct.isLoading = false;
      state.createProduct.error = null;
      state.createProduct.success = true;
      state.createProduct.data = payload;
    });
    builder.addCase(createProductAction.rejected, (state, { payload }) => {
      state.createProduct.isLoading = false;
      state.createProduct.error = payload?.data;
    });
    builder.addCase(editProductAction.pending, (state) => {
      state.editProduct.isLoading = true;
      state.editProduct.error = null;
    });
    builder.addCase(editProductAction.fulfilled, (state, { payload }) => {
      state.editProduct.isLoading = false;
      state.editProduct.error = null;
      state.editProduct.success = true;
      state.editProduct.data = payload;
    });
    builder.addCase(editProductAction.rejected, (state, { payload }) => {
      state.editProduct.isLoading = false;
      state.editProduct.error = payload?.data;
    });
  },
});

export const { resetCreateProductState, resetEditProductState } =
  productSlice.actions;

export default productSlice.reducer;
