import axios from "../axios";

export const createMealRequest = async (data) => {
  return axios.post("/meals", data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const removeMealItemProductRequest = async (
  mealId,
  mealProductId,
  productIndex
) =>
  axios.delete(
    `/meals/${mealId}/${mealProductId}?productIndex=${productIndex}`
  );
