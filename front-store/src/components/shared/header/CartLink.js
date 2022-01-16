/** @format */

import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const CartLink = () => {
  const { list } = useSelector((state) => state.cart);

  return (
    <li className="nav-link__item nav-link__item-btn position-relative">
      <NavLink to="/cart" activeClassName="nav-link__active">
        <AiOutlineShoppingCart size={22} />{" "}
        <span className="d-none d-md-inline" data-testid="cart-link__text">
          Giỏ hàng
        </span>
      </NavLink>
      <span className={`header-item__badge ${list.length > 0 ? "" : "d-none"}`}>
        {list.length}
      </span>
    </li>
  );
};

export default CartLink;
