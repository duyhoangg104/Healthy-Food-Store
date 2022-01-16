/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import PropTypes from "prop-types";
import { activeClassName } from "../../../utils/helper";
import IconLoader from "../iconLoader";

const Modal = ({
  isOpen,
  close,
  isLoading,
  title,
  subtitle,
  onConfirm,
  children,
  hideSubmit,
  bgColor,
}) => {
  // eslint-disable-next-line no-undef
  const modalDomNode = document.getElementById("modal");

  return ReactDOM.createPortal(
    <div
      className={`custom-modal ${isOpen ? "open" : "close"}`}
      style={{
        backgroundColor: bgColor || "#f4f4f4",
      }}
    >
      <div className="page-title">
        <h1>{title}</h1>
      </div>
      {subtitle && (
        <div className="content my-4 px-4">
          <p className="lead fw-bold text-center">{subtitle}</p>
        </div>
      )}
      {children && <div className="children">{children}</div>}
      <div className="actions mb-3">
        <button
          className={`btn-green ${activeClassName(hideSubmit, "d-none", "")} ${
            isLoading ? "divDisable divDisableWhite" : ""
          }`}
          onClick={onConfirm}
        >
          {isLoading && <IconLoader />} ĐỒNG Ý
        </button>
        <button
          className={`btn-green ${
            isLoading ? "divDisable divDisableWhite" : ""
          }`}
          onClick={close}
        >
          HỦY
        </button>
      </div>
    </div>,
    modalDomNode
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  onConfirm: PropTypes.func,
  children: PropTypes.element,
  hideSubmit: PropTypes.bool,
};

export default Modal;
