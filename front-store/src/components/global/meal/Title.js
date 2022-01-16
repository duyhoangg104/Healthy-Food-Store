import React from "react";
import PropTypes from "prop-types";
import { numberFormatter } from "../../../utils/helper";
import { Link } from "react-router-dom";

const MealSuggestionTitle = ({ userInfo, tdeeData }) => {
  return (
    <div className="container">
      <div className="my-4 text-green">
        <p>Xin chào, {userInfo?.fullName}</p>
        {tdeeData?.data?.tdee ? (
          <p>
            Dựa theo tính toán TDEE của quý khách, chúng tôi đề xuất nên chọn
            khẩu phần ăn trong tầm{" "}
            {numberFormatter.format(tdeeData?.data?.tdee / 3)} kcal
          </p>
        ) : (
          <div>
            Bạn chưa tính TDEE. <Link to="/ttde-calc">Tính TDEE</Link>
          </div>
        )}
      </div>
    </div>
  );
};

MealSuggestionTitle.propTypes = {
  userInfo: PropTypes.object,
  tdeeData: PropTypes.object,
};

export default MealSuggestionTitle;
