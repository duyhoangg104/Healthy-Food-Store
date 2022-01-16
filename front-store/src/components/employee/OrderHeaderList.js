/** @format */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { activeClassName } from "../../utils/helper";
import ClickOusideWrapper from "../shared/ClickOusideWrapper";

const orderStatuses = [
  { status: "pending", label: "Đơn đang xử lý" },
  { status: "pending-unpaid", label: "Đơn chưa thanh toán" },
];

const HeaderList = ({
  title,
  onSearch,
  isLoading,
  value,
  setValue,
  orderStatus,
  setOrderStatus,
}) => {
  const [showOrderStatusList, setShowOrderStatusList] = useState(false);

  return (
    <div
      className={`header-list ${activeClassName(
        isLoading,
        "divDisable divDisableWhite"
      )}`}
    >
      <h3 className="header-list__title"> {title} </h3>
      <div className="d-flex">
        <ClickOusideWrapper callback={() => setShowOrderStatusList(false)}>
          <div
            className={`sign-custom__select ${
              showOrderStatusList ? "show" : ""
            }`}
            onClick={() => setShowOrderStatusList((prevState) => !prevState)}
            style={{
              width: 200,
            }}
          >
            <li className="assignee assigned">
              {orderStatus
                ? orderStatuses.find((item) => item.status === orderStatus)
                    ?.label
                : "Trạng thái đơn hàng"}
            </li>
            <ul className={`h-auto ${showOrderStatusList ? "show" : ""}`}>
              {orderStatuses.map((order_status) => (
                <li
                  key={order_status.status}
                  onClick={() => setOrderStatus(order_status.status)}
                >
                  {order_status.label}
                </li>
              ))}
            </ul>
            <button className="sign__select-icon">
              <i
                className={`fas fa-chevron-${
                  showOrderStatusList ? "up" : "down"
                }`}
              />
            </button>
          </div>
        </ClickOusideWrapper>
        <div className="header-search__list">
          <input
            placeholder="Nhập mã đơn"
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (!e.target.value) {
                onSearch(e.target.value);
              }
            }}
          />
          <button onClick={() => onSearch(value.trim().toLowerCase())}>
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
};

HeaderList.propTypes = {
  title: PropTypes.string,
  onSearch: PropTypes.func,
  isLoading: PropTypes.bool,
  value: PropTypes.string,
  setValue: PropTypes.func,
  orderStatus: PropTypes.string,
  setOrderStatus: PropTypes.func,
};

export default HeaderList;
