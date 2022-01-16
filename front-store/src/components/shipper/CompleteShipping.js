import React, { useState } from "react";
import PropTypes from "prop-types";
import ClickOusideWrapper from "../shared/ClickOusideWrapper";

const CompleteShipping = ({ item, completeShippingOrderHandler }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <ClickOusideWrapper callback={() => setShowDropdown(false)}>
      <div
        className={`sign-custom__select ${showDropdown ? "show" : ""}`}
        onClick={() => setShowDropdown((prevState) => !prevState)}
      >
        <li className={`assignee ${item.successAt ? "assigned" : ""}`}>
          Đang giao
        </li>
        <ul className={`h-auto ${showDropdown ? "show" : ""}`}>
          <li
            onClick={() => completeShippingOrderHandler(item._id)}
            className="text-green"
          >
            Đã giao đơn
          </li>
        </ul>
        <button className="sign__select-icon">
          <i className={`fas fa-chevron-${showDropdown ? "up" : "down"}`} />
        </button>
      </div>
    </ClickOusideWrapper>
  );
};

CompleteShipping.propTypes = {
  item: PropTypes.object,
  completeShippingOrderHandler: PropTypes.func,
};

export default CompleteShipping;
