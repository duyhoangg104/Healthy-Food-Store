/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  mealData: null,
};

export const mealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    addProductToMealList: (state, { payload }) => {
      state.list.push(payload);
    },
    increaseMealQty: (state, { payload }) => {
      state.list = state.list.map((item) =>
        item._id === payload
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item
      );
    },
    decreaseMealQty: (state, { payload }) => {
      state.list = state.list.map((item) =>
        item._id === payload
          ? {
              ...item,
              qty: item.qty - 1,
            }
          : item
      );
    },
    removeProductFromMealList: (state, { payload }) => {
      if (state.list.find((item) => item._id === payload)) {
        state.list = state.list.filter((item) => item._id !== payload);
      }
    },
    setMealData: (state, { payload }) => {
      state.mealData = payload;
    },
    resetComboList: (state) => {
      state.list = [];
    },
  },
});

export const {
  addProductToMealList,
  removeProductFromMealList,
  increaseMealQty,
  decreaseMealQty,
  setMealData,
  resetComboList,
} = mealSlice.actions;

export default mealSlice.reducer;
