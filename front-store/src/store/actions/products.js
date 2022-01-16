/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProductRequest, editProductRequest } from "../api";

export const createProductAction = createAsyncThunk(
  "product/createNewProduct",
  async (product, { rejectWithValue }) => {
    try {
      const { data } = await createProductRequest(product);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const editProductAction = createAsyncThunk(
  "product/editProductData",
  async (product, { rejectWithValue }) => {
    try {
      const { data } = await editProductRequest(product);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
