/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const couponApi = createApi({
  reducerPath: "couponApi",
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
    getCouponList: builder.query({
      query: () => `coupons`,
    }),
  }),
});

export const { useGetCouponListQuery } = couponApi;
