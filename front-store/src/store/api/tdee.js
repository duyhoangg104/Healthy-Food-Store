/** @format */

import axios from "../axios";

export const getMyTdeeDataRequest = async () => {
  return axios.get("/tdees");
};

export const createNewTdeeIndexRequest = async (data) => {
  return axios.post("/tdees", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};
