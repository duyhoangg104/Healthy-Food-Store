import React from "react";
import PropTypes from "prop-types";
import { checkProductExistOnMealList } from "../../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import Item from "./Item";
import {
  addProductToMealList,
  increaseMealQty,
  decreaseMealQty,
} from "../../../store/slice/mealSlice";
import ProductListSkeleton from "../../../skeleton/ProductListSkeleton";

const Products = ({ products, isLoading }) => {
  const { list } = useSelector((state) => state.meal);
  const dispatch = useDispatch();

  const addProductToMealHandler = (product, qty) => {
    dispatch(
      addProductToMealList({
        ...product,
        qty: qty || 1,
      })
    );
  };

  const increaseMealQtyHandler = (productId, qty) => {
    if (qty <= 99) {
      dispatch(increaseMealQty(productId));
    }
  };

  const decreaseMealQtyHandler = (productId, qty) => {
    if (qty > 1) {
      dispatch(decreaseMealQty(productId));
    }
  };

  if (isLoading) {
    return <ProductListSkeleton hideTitle />;
  }

  return (
    <div>
      <div className="productList__meal">
        <div className="list">
          {products?.map((product) => (
            <Item
              key={product._id}
              product={product}
              isInMealList={checkProductExistOnMealList(product, list)}
              onAddProduct={addProductToMealHandler}
              onIncreaseQty={increaseMealQtyHandler}
              onDecreaseQty={decreaseMealQtyHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Products.propTypes = {
  products: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default Products;
