/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  notifications: [],
  sidebar: {
    isShow: false,
  },
};

export const authSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    addNoti(state, { payload }) {
      state.notifications.push(payload);
    },
    removeNoti(state, { payload }) {
      state.notifications = state.notifications.filter(
        (item) => item.id !== payload
      );
    },
    showSidebar: (state) => {
      state.sidebar.isShow = true;
    },
    hideSidebar: (state) => {
      state.sidebar.isShow = false;
    },
    toggleSidebar: (state) => {
      state.sidebar.isShow = !state.sidebar.isShow;
    },
    addMultipleNoti: (state, { payload }) => {
      state.notifications = state.notifications.concat(payload);
    },
  },
});

export const {
  addNoti,
  removeNoti,
  showSidebar,
  hideSidebar,
  toggleSidebar,
  addMultipleNoti,
} = authSlice.actions;

export default authSlice.reducer;
