import React from "react";
import PropTypes from "prop-types";
import { formatter } from "../../utils/helper";
import "./index.scss";
import CompleteShipping from "./CompleteShipping";

const MobileOrderItem = ({
  order,
  handleAssignedOrderFromEmployee,
  isShipping,
  completeShippingOrderHandler,
}) => {
  return (
    <div className="mobile-order__item">
      <div className="mobile-order__row">
        <strong>Mã đơn hàng</strong>
        <span> {order._id} </span>
      </div>
      <div className="mobile-order__row">
        <strong>Địa chỉ giao hàng </strong>
        <span> {order.deliveryAddress.address} </span>
      </div>
      <div className="mobile-order__row">
        <strong>SĐT </strong>
        <span> {order.deliveryAddress.phone} </span>
      </div>
      <div className="mobile-order__row">
        <strong>Giá bán </strong>
        <span> {formatter.format(order.total)} </span>
      </div>
      {isShipping && (
        <div className="mobile-order__row">
          <strong>Thời gian nhận </strong>
          <span>
            {new Date(order.deliveryAt).toLocaleDateString()} -{" "}
            {new Date(order.deliveryAt).toLocaleTimeString()}
          </span>
        </div>
      )}
      <div className="mobile-order__row">
        <strong>Thanh toán </strong>
        <span> {order.paymentMethod.toUpperCase()} </span>
      </div>
      {isShipping ? (
        <div
          style={{
            width: 120,
          }}
        >
          <CompleteShipping
            item={order}
            completeShippingOrderHandler={completeShippingOrderHandler}
          />
        </div>
      ) : (
        <div className="mobile-order__row mt-3">
          <button
            className="btn-green sm me-2"
            onClick={() =>
              handleAssignedOrderFromEmployee(order._id, "shipping")
            }
          >
            Xác nhận
          </button>
          <button
            className="btn-green sm red"
            onClick={() => handleAssignedOrderFromEmployee(order._id, "reject")}
          >
            Hủy
          </button>
        </div>
      )}
    </div>
  );
};

MobileOrderItem.propTypes = {
  order: PropTypes.object,
  handleAssignedOrderFromEmployee: PropTypes.func,
  isShipping: PropTypes.bool,
  completeShippingOrderHandler: PropTypes.func,
};

export default MobileOrderItem;
