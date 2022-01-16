/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { getListRoleAction } from "../actions/role";

const initialState = {
  roles: [],
  isLoading: false,
  error: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getListRoleAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getListRoleAction.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(getListRoleAction.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.roles = payload;
    });
  },
});

export default globalSlice.reducer;
