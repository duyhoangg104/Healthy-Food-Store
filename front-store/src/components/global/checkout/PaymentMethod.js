import React from "react";
import PropTypes from "prop-types";
import "./index.scss";
import { FaCcPaypal } from "react-icons/fa";
import { IoCashOutline } from "react-icons/io5";

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <div className="border-green rounded-10 shadow p-4 mb-4">
      <div className="payment-methods">
        <div className="payment-item mb-3">
          <label className="radio-container" htmlFor="cod">
            <IoCashOutline className="mx-2" /> Thanh toán khi nhận hàng
            <input
              type="radio"
              id="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <span className="checkmark" />
          </label>
        </div>
        <div className="payment-item mb-3">
          <label className="radio-container" htmlFor="paypal">
            <FaCcPaypal className="mx-2" /> Thanh toán PayPal
            <input
              type="radio"
              id="paypal"
              checked={paymentMethod === "paypal"}
              onChange={() => setPaymentMethod("paypal")}
            />
            <span className="checkmark" />
          </label>
        </div>
      </div>
    </div>
  );
};

PaymentMethod.propTypes = {
  setPaymentMethod: PropTypes.func,
  paymentMethod: PropTypes.string,
};

export default PaymentMethod;
