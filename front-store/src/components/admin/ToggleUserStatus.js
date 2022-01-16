import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ToggleUserStatus = ({ onToggle, isActive }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(isActive);
  }, [isActive]);

  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={onToggle} />
      <span className="slider round" />
    </label>
  );
};

ToggleUserStatus.propTypes = {
  onToggle: PropTypes.func,
  isActive: PropTypes.bool,
};

export default ToggleUserStatus;
