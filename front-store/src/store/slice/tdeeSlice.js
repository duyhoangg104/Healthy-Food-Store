/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { getMyTdeeDataAction, createNewTdeeIndexAction } from "../actions/tdee";

const initialState = {
  tdeeData: {
    isLoading: false,
    error: null,
    success: false,
    data: null,
  },
  createNewTdee: {
    isLoading: false,
    error: null,
    success: false,
    data: null,
  },
};

export const tdeeSlice = createSlice({
  name: "tdee",
  initialState,
  reducers: {
    setNewTdeeData: (state, { payload }) => {
      state.tdeeData.data = payload;
      state.createNewTdee.success = false;
    },
    clearTdeeData: (state) => {
      state.tdeeData.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyTdeeDataAction.pending, (state) => {
      state.tdeeData.isLoading = true;
      state.tdeeData.error = null;
    });
    builder.addCase(getMyTdeeDataAction.fulfilled, (state, { payload }) => {
      state.tdeeData.isLoading = false;
      state.tdeeData.error = null;
      state.tdeeData.success = true;
      state.tdeeData.data = payload;
    });
    builder.addCase(getMyTdeeDataAction.rejected, (state, { payload }) => {
      state.tdeeData.isLoading = false;
      state.tdeeData.error = payload;
    });
    builder.addCase(createNewTdeeIndexAction.pending, (state) => {
      state.createNewTdee.isLoading = true;
      state.createNewTdee.error = null;
    });
    builder.addCase(
      createNewTdeeIndexAction.fulfilled,
      (state, { payload }) => {
        state.createNewTdee.isLoading = false;
        state.createNewTdee.error = null;
        state.createNewTdee.success = true;
        state.createNewTdee.data = payload;
      }
    );
    builder.addCase(createNewTdeeIndexAction.rejected, (state, { payload }) => {
      state.createNewTdee.isLoading = false;
      state.createNewTdee.error = payload;
    });
  },
});

export const { setNewTdeeData, clearTdeeData } = tdeeSlice.actions;

export default tdeeSlice.reducer;
