import React, { useState } from "react";
import { useGetMealProductsDataQuery } from "../../../store/services/meal";
import "./index.scss";
import PropTypes from "prop-types";
import Loader from "../../ui/loader";
import MealListItem from "./MealListItem";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addProductToCart,
  calcTotal,
  resetCart,
} from "../../../store/slice/cartSlice";
import { removeMealItemProductRequest } from "../../../store/api";
import { activeClassName } from "../../../utils/helper";

const MealList = ({ mealId, setAllowCreateNewMeal, refetchMealData }) => {
  const { data, isLoading, isFetching, refetch } = useGetMealProductsDataQuery(
    mealId,
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const checkoutHandler = (products) => {
    dispatch(resetCart());
    products.forEach((item) => {
      dispatch(
        addProductToCart({
          ...item.product,
          qty: item.qty,
        })
      );
    });
    dispatch(calcTotal());
    history.push("/checkout");
  };

  const onDeleteProductFromMeal = async (mealProductId, productIndex) => {
    setIsDeleting(true);
    try {
      await removeMealItemProductRequest(mealId, mealProductId, productIndex);
      refetch();
      refetchMealData();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className={`my-5 ${activeClassName(
        isFetching || isDeleting,
        "divDisable divDisableWhite"
      )}`}
    >
      <div className="container">
        <div className="meal-list">
          {data?.mealProducts?.map((mealProduct) => (
            <MealListItem
              key={mealProduct._id}
              mealProduct={mealProduct}
              onCheckout={checkoutHandler}
              onDeleteProductFromListItem={onDeleteProductFromMeal}
            />
          ))}
        </div>
        <div>
          <button
            className={`btn-white mt-4`}
            onClick={() => setAllowCreateNewMeal(true)}
          >
            Tạo thêm phần ăn
          </button>
        </div>
      </div>
    </div>
  );
};

MealList.propTypes = {
  mealId: PropTypes.string.isRequired,
  setAllowCreateNewMeal: PropTypes.func,
  refetchMealData: PropTypes.func,
};

export default MealList;
