/** @format */

import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const EmptyCart = ({ title, subTitle }) => {
  return (
    <div className="empty-cart d-flex align-items-center justify-content-center flex-column">
      <img
        src="https://www.petpetgoods.com/wp-content/themes/wisdom/img/cart_empty.png"
        alt=""
      />
      <div className="page-title">
        <h1>{title || "Giỏ hàng trống"}</h1>
      </div>
      <p className="lead">{subTitle || "Vui lòng mua thêm sản phẩm"}</p>
      <Link to="/menu" className="btn-green">
        Shopping
      </Link>
    </div>
  );
};

EmptyCart.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

export default EmptyCart;
