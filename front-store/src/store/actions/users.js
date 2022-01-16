/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateMyInfoRequest, updateMyPasswordRequest } from "../api";

export const updateMyInfoAction = createAsyncThunk(
  "user/updateMyInfo",
  async (updateData, { rejectWithValue }) => {
    try {
      const { data } = await updateMyInfoRequest(updateData);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateMyPasswordAction = createAsyncThunk(
  "user/updateMyPassword",
  async (updateData, { rejectWithValue }) => {
    try {
      const { data } = await updateMyPasswordRequest(updateData);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
