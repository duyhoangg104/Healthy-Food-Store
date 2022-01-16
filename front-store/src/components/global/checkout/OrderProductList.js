import React from "react";
import "./index.scss";
import PropTypes from "prop-types";
import { formatter } from "../../../utils/helper";

const OrderProductList = ({ list, total }) => {
  return (
    <div className="order-product__list border-green rounded-10 shadow">
      <div className="list p-4">
        {list.map((item) => (
          <div
            className="item mb-3 d-flex align-items-center flex-column flex-sm-row"
            key={item._id}
          >
            <div className="detail d-flex align-items-center">
              <img src={item.imageUrl} alt={item.title} />
              <h6>{item.title?.substr(0, 30)}...</h6>
            </div>
            <div className="qty">
              <div> x{item.qty} </div>
            </div>
            <div className="price">{formatter.format(item.price)}</div>
          </div>
        ))}
      </div>
      <div className="d-flex align-items-center justify-content-between my-4 p-4">
        <p className="fw-bold">Tổng đơn hàng</p>
        <p>{formatter.format(total)}</p>
      </div>
    </div>
  );
};

OrderProductList.propTypes = {
  list: PropTypes.array,
  total: PropTypes.number,
};

export default OrderProductList;
