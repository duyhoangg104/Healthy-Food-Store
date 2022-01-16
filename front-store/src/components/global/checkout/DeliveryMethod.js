import React from "react";
import "./index.scss";
import PropTypes from "prop-types";

const DeliveryMethod = ({ deliveryMethod, setDeliveryMethod }) => {
  return (
    <div className="delivery-method mb-5">
      <div className="row">
        <div className="col-6">
          <img
            src="https://lh3.googleusercontent.com/iJVlSfvuDXmlijPsWrPLiq7NvrFdEq0Z4b2ljH26UTUIYfURe9kIAQKgS6TKUjS64YmL"
            alt=""
          />
          <div>
            <strong className="text-center d-block mb-2">
              Giao hàng tận nơi
            </strong>
          </div>
          <div className="delivery-item">
            <label className="radio-container" htmlFor="ship">
              <input
                type="radio"
                id="ship"
                checked={deliveryMethod === "ship"}
                onChange={() => setDeliveryMethod("ship")}
              />
              <span className="checkmark" />
            </label>
          </div>
        </div>
        <div className="col-6">
          <img
            src="https://nongdan.pro/wp-content/uploads/2017/05/shop-icon.png"
            alt=""
          />
          <div>
            <strong className="text-center d-block mb-2">
              Lấy trực tiếp tại cửa hàng
            </strong>
          </div>
          <div className="delivery-item">
            <label className="radio-container" htmlFor="get">
              <input
                type="radio"
                id="get"
                checked={deliveryMethod === "get"}
                onChange={() => setDeliveryMethod("get")}
              />
              <span className="checkmark" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

DeliveryMethod.propTypes = {
  setDeliveryMethod: PropTypes.func,
  deliveryMethod: PropTypes.string,
};

export default DeliveryMethod;
