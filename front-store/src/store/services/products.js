/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
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
    getCategoryList: builder.query({
      query: (status = "") => `categories?status=${status}`,
    }),
  }),
});

export const productApi = createApi({
  reducerPath: "productApi",
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
    getProductList: builder.query({
      query: (category = null) => `products?category=${category || ""}`,
    }),
    getProductDetail: builder.query({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const { useGetCategoryListQuery } = categoryApi;
export const { useGetProductListQuery, useGetProductDetailQuery } = productApi;
