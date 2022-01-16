import React from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import PropTypes from "prop-types";
import {
  activeClassName,
  formatter,
  numberFormatter,
} from "../../../utils/helper";
import { FaTimes } from "react-icons/fa";

const MealListItem = ({
  mealProduct,
  onCheckout,
  onDeleteProductFromListItem,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="meal-item__wrapper" key={mealProduct._id}>
      <div
        className="meal-product__item p-3 rounded shadow-sm cursor-pointer mb-4 d-flex justify-content-between align-items-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="left-box">
          <h4> {mealProduct.title} </h4>
          <small className="text-muted">
            On {mealProduct.createdAt?.substr(0, 10)}
          </small>
        </div>
        <div>
          {isOpen ? <BsChevronUp size={24} /> : <BsChevronDown size={24} />}
        </div>
      </div>
      <div className={`meal-product__list ${isOpen ? "open" : ""}`}>
        {mealProduct.products.map((item, index) => (
          <div
            key={item.product?._id}
            className="item p-3 rounded shadow-sm mb-3 d-flex"
          >
            <img
              src={item.product?.imageUrl}
              alt={item.product?.title}
              className="me-3 d-block"
            />
            <div className="info">
              <h5>{item.product?.title} </h5>
              <p> {numberFormatter.format(item.product?.calor)} kcal</p>
              <p>SL : {item.qty}</p>
              <p> {formatter.format(item.product?.price)} </p>
            </div>
            <div className="delete">
              <button
                className="btn-green red sm"
                onClick={() =>
                  onDeleteProductFromListItem(mealProduct._id, index)
                }
              >
                <FaTimes />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        className={`meal-actions mt-4 mb-3 ${activeClassName(
          isOpen,
          "",
          "d-none"
        )}`}
      >
        <button
          className="btn-green"
          onClick={() => onCheckout(mealProduct.products)}
        >
          Chọn mua
        </button>
      </div>
    </div>
  );
};

MealListItem.propTypes = {
  mealProduct: PropTypes.object.isRequired,
  onCheckout: PropTypes.func,
  onDeleteProductFromListItem: PropTypes.func,
};

export default MealListItem;
