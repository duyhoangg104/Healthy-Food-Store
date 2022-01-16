import React, { useState } from "react";
import PropTypes from "prop-types";

const ToggleProductStatus = ({
  onToggle,
  isActive,
  item,
  toggling,
  selectedId,
}) => {
  const [checked, setChecked] = useState(isActive);

  const handleChange = () => {
    setChecked(!checked);
    onToggle();
  };

  return (
    <label
      className={`switch ${
        toggling && item._id === selectedId ? "divDisable divDisableWhite" : ""
      }`}
    >
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <span className="slider round" />
    </label>
  );
};

ToggleProductStatus.propTypes = {
  onToggle: PropTypes.func,
  isActive: PropTypes.bool,
  item: PropTypes.object,
  toggling: PropTypes.bool,
  selectedId: PropTypes.string,
};

export default ToggleProductStatus;
