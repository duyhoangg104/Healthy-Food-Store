/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_REST_API_URL_PROD
        : process.env.REACT_APP_REST_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.authData.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSingleUserInfoData: builder.query({
      query: (id) => `users/user/${id}`,
    }),
    getCustomerList: builder.query({
      query: () => `users/customers`,
    }),
    getShipperList: builder.query({
      query: () => `users/shippers`,
    }),
    getEmployeeList: builder.query({
      query: () => `users/employees`,
    }),
    getMyWishList: builder.query({
      query: () => `users/favorites`,
    }),
  }),
});

export const {
  useGetSingleUserInfoDataQuery,
  useGetCustomerListQuery,
  useGetMyWishListQuery,
  useGetShipperListQuery,
  useGetEmployeeListQuery,
} = userApi;
