/** @format */

import React, { useState } from "react";
import "./index.scss";
import PropTypes from "prop-types";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  activeClassName,
  formatter,
  numberFormatter,
} from "../../../utils/helper";

const Item = ({
  product,
  isInMealList,
  onAddProduct,
  onIncreaseQty,
  onDecreaseQty,
}) => {
  const [qty, setQty] = useState(isInMealList?.qty || 1);

  return (
    <div className="product-item shadow shadow-sm rounded">
      <div className="media">
        <img src={product.imageUrl} alt={product.title} />
      </div>
      <div className="info">
        <h6>{product.title}</h6>
      </div>
      <div className="select">
        <p className="text-muted text-center lead mb-1">
          {formatter.format(product.price)}
        </p>
        <button
          className={`btn-white ${activeClassName(
            isInMealList || !product.isActivated,
            "divDisable divDisableWhite btn-green__bg",
            ""
          )}`}
          onClick={() => onAddProduct(product, qty)}
        >
          {product.isActivated ? "Chọn" : "Hết hàng"}
        </button>
      </div>
      <div className="actions">
        <div className="left">
          <input
            type="number"
            className="input rounded"
            min={1}
            max={100}
            value={qty}
            onChange={(e) => setQty(+e.target.value)}
          />
          <div className="btns">
            <button
              className="btn-green sm"
              onClick={() => {
                qty < 100 ? setQty(qty + 1) : null;
                onIncreaseQty(product._id, qty + 1);
              }}
            >
              <AiOutlinePlus />
            </button>
            <button
              className="btn-green sm"
              onClick={() => {
                qty === 1 ? null : setQty(qty - 1);
                onDecreaseQty(product._id, qty);
              }}
            >
              <AiOutlineMinus />
            </button>
          </div>
        </div>
        <div className="right">
          {numberFormatter.format(product?.calor * qty)} kcal
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  product: PropTypes.object,
  isInMealList: PropTypes.object,
  onAddProduct: PropTypes.func,
  onIncreaseQty: PropTypes.func,
  onDecreaseQty: PropTypes.func,
};

export default Item;
