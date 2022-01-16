import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserListRequest, createUserRequest } from "../api";
import { updateUserInfoRequest } from "../api/users";

export const getUsersAction = createAsyncThunk(
  "admin/getUserList",
  async (filter, { rejectWithValue }) => {
    try {
      const { data } = await getUserListRequest(filter);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUserAction = createAsyncThunk(
  "admin/createNewUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await createUserRequest(userData);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const editUserInfoAction = createAsyncThunk(
  "admin/editUserInfo",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await updateUserInfoRequest(userData, userData.id);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
