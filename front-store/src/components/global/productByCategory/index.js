/** @format */

import React from "react";
import "./index.scss";
import PropTypes from "prop-types";
import ProductItem from "../productItem";
import { useSelector } from "react-redux";
import { checkProductExistOnCart } from "../../../utils/helper";

const ProductsByCategory = ({
  category,
  products,
  addProductToCartHandler,
  addToFavoriteHandler,
  removeProductFromFavoritesHandler,
}) => {
  const { list } = useSelector((state) => state.cart);

  return (
    <div className="productList">
      <div className="page-title text-left">
        <h1 className={`fw-600 ${!products?.length ? "d-none" : ""}`}>
          {category.title}
        </h1>
      </div>
      <div className="list">
        {products?.map((product) => (
          <ProductItem
            key={product._id}
            product={product}
            isInCart={checkProductExistOnCart(product, list)}
            addProductToCartHandler={addProductToCartHandler}
            addToFavoriteHandler={addToFavoriteHandler}
            removeProductFromFavoritesHandler={
              removeProductFromFavoritesHandler
            }
          />
        ))}
      </div>
    </div>
  );
};

ProductsByCategory.propTypes = {
  category: PropTypes.object,
  products: PropTypes.array,
  addProductToCartHandler: PropTypes.func,
  addToFavoriteHandler: PropTypes.func,
  removeProductFromFavoritesHandler: PropTypes.func,
};

export default ProductsByCategory;
