/** @format */

import { createSlice } from "@reduxjs/toolkit";
import {
  createUserAction,
  editUserInfoAction,
  getUsersAction,
} from "../actions/admin";

const initialState = {
  users: {
    isLoading: false,
    error: null,
    list: [],
  },
  createUser: {
    isLoading: false,
    error: null,
    success: false,
    data: null,
  },
  editUserInfo: {
    isLoading: false,
    error: null,
    success: false,
    data: null,
  },
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addNewUserToState: (state, { payload }) => {
      state.users.list.push(payload);
      state.createUser.success = false;
      state.createUser.data = null;
    },
    updateUserInfoInState: (state, { payload }) => {
      state.users.list = state.users.list.map((user) =>
        user._id === payload._id ? payload : user
      );
      state.editUserInfo.success = false;
      state.editUserInfo.data = null;
    },
    toggleUserActivateStatus: (state, { payload }) => {
      state.users.list = state.users.list.map((item) =>
        item._id === payload
          ? { ...item, isActivated: !item.isActivated }
          : item
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersAction.fulfilled, (state, { payload }) => {
      if (payload.users.length) {
        state.users.list = payload.users;
      } else {
        state.users.list = [];
      }
      state.users.isLoading = false;
      state.users.error = null;
    });
    builder.addCase(getUsersAction.pending, (state) => {
      state.users.isLoading = true;
      state.users.error = null;
    });
    builder.addCase(getUsersAction.rejected, (state, { payload }) => {
      state.users.isLoading = false;
      state.users.error = payload?.data;
    });
    builder.addCase(createUserAction.pending, (state) => {
      state.createUser.isLoading = true;
      state.createUser.error = null;
    });
    builder.addCase(createUserAction.fulfilled, (state, { payload }) => {
      state.createUser.isLoading = false;
      state.createUser.error = null;
      state.createUser.success = true;
      state.createUser.data = payload;
    });
    builder.addCase(createUserAction.rejected, (state, { payload }) => {
      state.createUser.isLoading = false;
      state.createUser.error = payload;
    });
    builder.addCase(editUserInfoAction.pending, (state) => {
      state.editUserInfo.isLoading = true;
      state.editUserInfo.error = null;
    });
    builder.addCase(editUserInfoAction.fulfilled, (state, { payload }) => {
      state.editUserInfo.isLoading = false;
      state.editUserInfo.error = null;
      state.editUserInfo.success = true;
      state.editUserInfo.data = payload;
    });
    builder.addCase(editUserInfoAction.rejected, (state, { payload }) => {
      state.editUserInfo.isLoading = false;
      state.editUserInfo.error = payload;
    });
  },
});

export const {
  addNewUserToState,
  updateUserInfoInState,
  toggleUserActivateStatus,
} = adminSlice.actions;

export default adminSlice.reducer;
