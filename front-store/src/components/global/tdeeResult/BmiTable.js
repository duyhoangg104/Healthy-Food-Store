/** @format */

import React from "react";
import PropTypes from "prop-types";
import { bmiEvaluation, numberFormatter } from "../../../utils/helper";

const BmiTable = ({ data }) => {
  return (
    <div className="bmi-block">
      <h3 className="text-green">
        Điểm BMI: {numberFormatter.format(data.bmiScore)}
      </h3>
      <p className="lead">
        BMI của bạn là {numberFormatter.format(data.bmiScore)}, có nghĩa là bạn
        được phân loại là <strong>{bmiEvaluation(data.bmiScore)} </strong>
      </p>
      <div className="action-index__table mb-5 px-5">
        <div
          className={`item ${
            bmiEvaluation(data.bmiScore) === "Thiếu cân" ? "active" : ""
          }`}
        >
          <p>18.5 hoặc thấp hơn</p>
          <p>Thiếu cân</p>
        </div>
        <div
          className={`item ${
            bmiEvaluation(data.bmiScore) === "Cân nặng bình thường"
              ? "active"
              : ""
          }`}
        >
          <p>18.5 - 24.99</p>
          <p>Cân nặng bình thường</p>
        </div>
        <div
          className={`item ${
            bmiEvaluation(data.bmiScore) === "Quá cân" ? "active" : ""
          }`}
        >
          <p>25 - 29.99</p>
          <p>Quá cân</p>
        </div>
        <div
          className={`item ${
            bmiEvaluation(data.bmiScore) === "Béo phì" ? "active" : ""
          }`}
        >
          <p>30+</p>
          <p>Béo phì</p>
        </div>
      </div>
    </div>
  );
};

BmiTable.propTypes = {
  data: PropTypes.object,
};

export default BmiTable;
