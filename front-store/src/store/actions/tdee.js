/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyTdeeDataRequest, createNewTdeeIndexRequest } from "../api";

export const getMyTdeeDataAction = createAsyncThunk(
  "tdee/getMyTdeeData",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getMyTdeeDataRequest();
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNewTdeeIndexAction = createAsyncThunk(
  "tdee/createNewTdeeData",
  async (input, { rejectWithValue }) => {
    try {
      const { data } = await createNewTdeeIndexRequest(input);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
