/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { authUserRequest, registerUserRequest } from "../api";

export const authUserAction = createAsyncThunk(
  "auth/loginUserByEmailAndPassword",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await authUserRequest(loginData);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUserAction = createAsyncThunk(
  "auth/registerNewUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await registerUserRequest(userData);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
