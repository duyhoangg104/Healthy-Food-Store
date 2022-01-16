import React from "react";
import "./index.scss";
import PropTypes from "prop-types";

const SwitchCategoryStatus = ({ item, onTogglerStatus }) => {
  return (
    <div className="switch-category">
      <select
        value={item.status}
        className="custom-select"
        onChange={(e) => onTogglerStatus(item._id, e.target.value)}
      >
        <option value="normal">Normal</option>
        <option value="combo">Combo</option>
      </select>
    </div>
  );
};

SwitchCategoryStatus.propTypes = {
  item: PropTypes.object.isRequired,
  onTogglerStatus: PropTypes.func,
};

export default SwitchCategoryStatus;
