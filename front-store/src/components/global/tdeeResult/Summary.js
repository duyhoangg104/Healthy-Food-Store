/** @format */

import React from "react";
import PropTypes from "prop-types";
import actionIndexes from "../../../constants/tdee";
import { Link } from "react-router-dom";

const Summary = ({ data }) => {
  return (
    <div className="tdee-summary my-3 text-center">
      Bạn hiện tại là <span className="tdee-badge"> {data.age} </span> tuổi, cao{" "}
      <span className="tdee-badge"> {data.height} </span> cm, nặng
      <span className="tdee-badge"> {data.weight} </span> kg, với mức độ vận
      động
      <span className="tdee-badge">
        {actionIndexes.find((item) => item.value === data.actionIndex).text}
      </span>
      {data.bodyFat && (
        <>
          và tỉ lệ mỡ là <span className="tdee-badge"> {data.bodyFat} </span>%
        </>
      )}
      <Link to={`/ttde-calc?recalc=true`} className="btn-green py-0 ms-2 py-1">
        Tính lại
      </Link>
    </div>
  );
};

Summary.propTypes = {
  data: PropTypes.object,
};

export default Summary;
