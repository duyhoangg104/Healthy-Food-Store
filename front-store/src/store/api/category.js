import axios from "../axios";

export const createCategoryRequest = async (data) => {
  return axios.post("/categories", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const toggleCategoryTypeRequest = async (category, status) =>
  axios.put(`/categories/toggle-status?category=${category}&status=${status}`);
