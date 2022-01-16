/** @format */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/main_logo.png";
import "./index.scss";

const Logo = ({ link, onClick, maxWidth }) => {
  const additionalImageStyles = maxWidth ? { maxWidth } : {};

  return (
    <div className="logo-item">
      <Link to={link || ""} onClick={onClick}>
        <img
          src={logo}
          alt="main logo"
          style={{
            ...additionalImageStyles,
            position: "static",
            left: 0,
          }}
        />
      </Link>
    </div>
  );
};

Logo.propTypes = {
  link: PropTypes?.string,
  onClick: PropTypes.func,
  maxWidth: PropTypes.number,
};

export default Logo;
