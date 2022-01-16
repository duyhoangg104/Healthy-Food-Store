import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderRequest } from "../api";

export const createOrderAction = createAsyncThunk(
  "order/createNewOrder",
  async (order, { rejectWithValue }) => {
    try {
      const { data } = await createOrderRequest(order);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
