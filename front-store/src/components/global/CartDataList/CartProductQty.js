import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const CartProductQty = ({ qty, onIncrease, onDecrease }) => {
  return <h1>CartProductQty</h1>;
};

CartProductQty.propTypes = {
  qty: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func,
};

export default CartProductQty;
