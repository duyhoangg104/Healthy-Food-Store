/** @format */

import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import "./index.scss";

const Backdrop = ({ open, onClicked, isLoading, disableClose }) => {
  // eslint-disable-next-line no-undef
  const backdropDomNode = document.getElementById("backdrop");

  return ReactDOM.createPortal(
    <div
      className={`c__backdrop ${open ? "show" : ""} ${
        isLoading || disableClose ? "divDisable" : ""
      }`}
      onClick={onClicked}
    />,
    backdropDomNode
  );
};

Backdrop.propTypes = {
  open: PropTypes.bool,
  onClicked: PropTypes.func,
  isLoading: PropTypes.bool,
  disableClose: PropTypes.bool,
};

export default Backdrop;
