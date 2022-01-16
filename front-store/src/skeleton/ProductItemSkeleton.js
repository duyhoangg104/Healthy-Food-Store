import React from "react";
import Skeleton from "react-loading-skeleton";
import "./index.scss";

const ProductItemSkeleton = () => {
  return (
    <div className="product-item-skeleton shadow shadow-sm rounded">
      <div className="media">
        <Skeleton
          style={{
            minHeight: 145,
            maxWidth: "100%",
            minWidth: 200,
          }}
        />
      </div>
      <div className="info">
        <Skeleton
          style={{
            maxWidth: "100%",
            minHeight: 30,
            marginBottom: 10,
          }}
        />
        <Skeleton
          style={{
            minHeight: 20,
            maxWidth: 120,
          }}
        />
      </div>
      <div className="">
        <Skeleton
          style={{
            maxWidth: "100%",
            minHeight: 65,
          }}
        />
      </div>
    </div>
  );
};

export default ProductItemSkeleton;
