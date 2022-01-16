import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRoleListRequest } from "../api";

export const getListRoleAction = createAsyncThunk(
  "role/getRoleList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getRoleListRequest();
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
