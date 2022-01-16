import React from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import ProductItemSkeleton from "./ProductItemSkeleton";
import "./index.scss";
import { activeClassName } from "../utils/helper";

const ProductListSkeleton = ({ hideTitle }) => {
  return (
    <div className="productList-skeleton">
      <div
        className={`page-title text-left ${activeClassName(
          hideTitle,
          "d-none"
        )}`}
      >
        <Skeleton
          style={{
            maxWidth: 200,
            minHeight: 30,
            marginBottom: 10,
          }}
        />
      </div>
      <div className="list">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
          <ProductItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

ProductListSkeleton.propTypes = {
  hideTitle: PropTypes.bool,
};

export default ProductListSkeleton;
