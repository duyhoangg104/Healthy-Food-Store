/** @format */

import axios from "axios";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_REST_API_URL_PROD
      : process.env.REACT_APP_REST_API_URL,
});

axiosInstance.defaults.headers.common["authorization"] =
  "Bearer " + localStorage.getItem("login_token");

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("login_token");
      if (!window.location.pathname.includes("/login")) {
        history.push("/login");
        window.location.href = "/login";
      }
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
