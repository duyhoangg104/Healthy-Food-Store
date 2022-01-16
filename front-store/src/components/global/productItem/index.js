/** @format */

import React, { useState } from "react";
import "./index.scss";
import PropTypes from "prop-types";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { formatter } from "../../../utils/helper";
import { BsHeart } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromCart } from "../../../store/slice/cartSlice";

const ProductItem = ({
  product,
  isInCart,
  addProductToCartHandler,
  addToFavoriteHandler,
  removeProductFromFavoritesHandler,
}) => {
  const [qty, setQty] = useState(isInCart?.qty || 1);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="product-item shadow shadow-sm rounded">
      <div className="media">
        <img src={product.imageUrl} alt={product.title} />
      </div>
      <div className="info">
        <h6>{product.title}</h6>
        <span className="text-muted"> {formatter.format(product.price)} </span>
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
            maxLength={3}
          />
          <div className="btns">
            <button
              className="btn-green sm"
              onClick={() => (qty < 100 ? setQty(qty + 1) : null)}
            >
              <AiOutlinePlus />
            </button>
            <button
              className="btn-green sm"
              onClick={() =>
                qty === 1
                  ? dispatch(removeProductFromCart(product._id))
                  : setQty(qty - 1)
              }
            >
              <AiOutlineMinus />
            </button>
          </div>
        </div>
        <div className="right">
          <button
            className={`btn-green h-100 w-100 ${
              qty <= 0 || !product.isActivated || qty > 100 ? "divDisable" : ""
            }`}
            onClick={() => addProductToCartHandler(product, qty, setQty)}
          >
            {product.isActivated ? "Thêm vào giỏ hàng" : "Hết hàng"}
          </button>
        </div>
      </div>
      <div className={`like-btn ${userInfo?._id ? "" : "d-none"}`}>
        {product.favorites.includes(userInfo?._id) ? (
          <button
            onClick={() => removeProductFromFavoritesHandler(product._id)}
          >
            <FaHeart size={24} color="#FF5A79" />
          </button>
        ) : (
          <button>
            <BsHeart
              size={24}
              onClick={() => addToFavoriteHandler(product._id)}
            />
          </button>
        )}
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
  isInCart: PropTypes.object,
  addProductToCartHandler: PropTypes.func,
  addToFavoriteHandler: PropTypes.func,
  removeProductFromFavoritesHandler: PropTypes.func,
};

export default ProductItem;
