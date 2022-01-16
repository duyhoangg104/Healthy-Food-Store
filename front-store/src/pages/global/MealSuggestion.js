import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MealSuggestionTitle from "../../components/global/meal/Title";
import "./styles/meal.scss";
import {
  useGetCategoryListQuery,
  useGetProductListQuery,
} from "../../store/services/products";
import CategorySelection from "../../components/global/meal/CategorySelection";
import Summary from "../../components/global/meal/Summary";
import Products from "../../components/global/meal/Products";
import { useGetMealDataQuery } from "../../store/services/meal";
import Loader from "../../components/ui/loader";
import { setMealData } from "../../store/slice/mealSlice";
import MealList from "../../components/global/meal/MealList";
import { activeClassName } from "../../utils/helper";

const MealSuggestion = () => {
  const { tdeeData } = useSelector((state) => state.tdee);
  const { userInfo, isAuthenticated } = useSelector((state) => state.auth);
  const { data: categoryList, isLoading } = useGetCategoryListQuery("combo", {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const history = useHistory();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { list } = useSelector((state) => state.meal);
  const dispatch = useDispatch();
  const [allowCreateNewMeal, setAllowCreateNewMeal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (categoryList) {
      setSelectedCategory(categoryList[0]?._id);
    }
  }, [categoryList]);

  const {
    data: productsData,
    isLoading: productsLoading,
    isFetching,
  } = useGetProductListQuery(selectedCategory, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const {
    data: mealData,
    isLoading: isLoadingMeal,
    isFetching: isFetchingMeal,
    refetch: refetchMealData,
  } = useGetMealDataQuery(null, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (mealData?.meal) {
      setSelectedCategory(categoryList[0]._id);
      dispatch(setMealData(mealData.meal));
    }
  }, [categoryList]);

  if (isLoadingMeal) {
    return <Loader />;
  }

  if (!isLoadingMeal && mealData?.meal?.list?.length && !allowCreateNewMeal) {
    return (
      <MealList
        mealId={mealData.meal._id}
        setAllowCreateNewMeal={setAllowCreateNewMeal}
        refetchMealData={refetchMealData}
      />
    );
  }

  return (
    <div
      className={`meal-suggestion ${activeClassName(
        isFetchingMeal,
        "divDisable divDisableWhite"
      )}`}
    >
      <MealSuggestionTitle userInfo={userInfo} tdeeData={tdeeData} />
      <div className="d-flex align-items-start flex-column flex-lg-row position-relative">
        <CategorySelection
          categories={categoryList}
          isLoading={isLoading}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="flex-1 mx-3 my-4 my-lg-0">
          <Products
            products={productsData}
            isLoading={productsLoading || isLoading || isFetching}
          />
        </div>
        <Summary
          list={list}
          refetchMealData={refetchMealData}
          setAllowCreateNewMeal={setAllowCreateNewMeal}
          maxCalor={tdeeData?.data?.tdee / 3}
        />
      </div>
    </div>
  );
};

export default MealSuggestion;
