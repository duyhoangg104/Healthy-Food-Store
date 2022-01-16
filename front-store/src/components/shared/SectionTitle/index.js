/** @format */

import React from "react";
import "./index.scss";
import PropTypes from "prop-types";

const SectionTitle = ({ title }) => {
  return (
    <div className="section-title">
      <div className="line left-line" />
      <div className="center-title">{title}</div>
      <div className="line right-line" />
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string,
};

export default SectionTitle;
