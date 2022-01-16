import React, { useState } from "react";
import PropTypes from "prop-types";
import ClickOusideWrapper from "../shared/ClickOusideWrapper";

const SelectShipper = ({ datShipperList, item, assignOrderToShipper }) => {
  const [showShipperList, setShowShipperList] = useState(false);

  return (
    <ClickOusideWrapper callback={() => setShowShipperList(false)}>
      <div
        className={`sign-custom__select ${showShipperList ? "show" : ""} ${
          item.paymentMethod === "paypal" && !item.paidAt ? "divDisable" : ""
        }`}
        onClick={() => setShowShipperList((prevState) => !prevState)}
      >
        <li className={`assignee ${item.deliveryBy ? "assigned" : ""}`}>
          {item.deliveryBy ? (
            <>
              <span className="d-none d-lg-inline">Giao cho </span>
              {
                datShipperList.find(
                  (shipper) => shipper._id === item.deliveryBy
                ).fullName
              }
            </>
          ) : item.paymentMethod === "paypal" && !item.paidAt ? (
            "Chưa thanh toán"
          ) : (
            "Chờ giao Shipper"
          )}
        </li>
        <ul className={`h-auto ${showShipperList ? "show" : ""}`}>
          {datShipperList?.map((shipper) => (
            <li
              key={shipper._id}
              onClick={() => assignOrderToShipper(item._id, shipper._id)}
            >
              <span className="d-none d-lg-inline">Giao cho </span>{" "}
              {shipper.fullName}
            </li>
          ))}
        </ul>
        <button className="sign__select-icon">
          <i className={`fas fa-chevron-${showShipperList ? "up" : "down"}`} />
        </button>
      </div>
    </ClickOusideWrapper>
  );
};

SelectShipper.propTypes = {
  item: PropTypes.object,
  datShipperList: PropTypes.array,
  assignOrderToShipper: PropTypes.func,
};

export default SelectShipper;
