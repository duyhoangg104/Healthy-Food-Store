/** @format */
import axios from "../axios";

export const authUserRequest = async (input) =>
  axios.post("/auth/login", input, {
    headers: {
      "Content-type": "application/json",
    },
  });

export const registerUserRequest = async (input) => {
  return axios.post("/auth/register", input, {
    headers: {
      "Content-type": "application/json",
    },
  });
};
