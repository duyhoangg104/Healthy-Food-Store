import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ToggleCouponStatus = ({ onToggle, item }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(item.isActivated);
  }, [item]);

  const handleChange = () => {
    onToggle(item._id, item.isActivated);
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <span className="slider round" />
    </label>
  );
};

ToggleCouponStatus.propTypes = {
  onToggle: PropTypes.func,
  item: PropTypes.object,
};

export default ToggleCouponStatus;
