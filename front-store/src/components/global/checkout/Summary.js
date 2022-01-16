import React from "react";
import PropTypes from "prop-types";
import "./index.scss";
import { formatter } from "../../../utils/helper";

const Summary = ({ total, shipAmount, couponAmount, selectedCoupon }) => {
  return (
    <div className="delivery-address border-green rounded-10 shadow mb-3">
      <div className="p-2 px-3">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <p>Tạm tính</p>
          <p>{formatter.format(total)}</p>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <p>Giảm giá - Khuyến mãi</p>
          <p>
            -{" "}
            {formatter.format(
              selectedCoupon?.type === "order" ? couponAmount : 0
            )}
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <p>Phí vận chuyển</p>
          <p>{formatter.format(shipAmount)}</p>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <p>Khuyến mãi vận chuyển</p>
          <p>
            -{" "}
            {formatter.format(
              selectedCoupon?.type === "ship" ? couponAmount : 0
            )}
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <strong>Thành tiền:</strong>
          <p>{formatter.format(total + shipAmount - couponAmount)}</p>
        </div>
      </div>
    </div>
  );
};

Summary.propTypes = {
  total: PropTypes.number,
  shipAmount: PropTypes.number,
  couponAmount: PropTypes.number,
  selectedCoupon: PropTypes.object,
};

export default Summary;
