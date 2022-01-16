import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
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
    getPendingOrderList: builder.query({
      query: () => `orders/pending`,
    }),
    getOrderDetail: builder.query({
      query: (orderId) => `orders/${orderId}`,
    }),
    getWaitingOrderList: builder.query({
      query: () => `orders/waiting`,
    }),
    getShippingOrderList: builder.query({
      query: () => `orders/shipping`,
    }),
    getOrderHistoryList: builder.query({
      query: () => `orders`,
    }),
    getCustomerOrderHistoryList: builder.query({
      query: (customerId) => `orders/customer-orders/${customerId}`,
    }),
    getShippedOrderList: builder.query({
      query: (dateData) =>
        `orders/shipped?startDate=${dateData.startDate}&endDate=${dateData.endDate}`,
    }),
    getReportedOrderList: builder.query({
      query: (inputData) =>
        `orders/reported?startDate=${inputData.startDate}&endDate=${inputData.endDate}&employeeId=${inputData.employeeId}`,
    }),
  }),
});

export const {
  useGetPendingOrderListQuery,
  useGetOrderDetailQuery,
  useGetWaitingOrderListQuery,
  useGetShippingOrderListQuery,
  useGetOrderHistoryListQuery,
  useGetShippedOrderListQuery,
  useGetCustomerOrderHistoryListQuery,
  useGetReportedOrderListQuery,
} = orderApi;
