/** @format */

import React from "react";
import "./index.scss";
import SectionTitle from "../../shared/SectionTitle";
import img1 from "../../../assets/images/image_14.png";
import img2 from "../../../assets/images/image_15.png";
import img3 from "../../../assets/images/image_16.png";
import img4 from "../../../assets/images/image_17.png";
import { Link } from "react-router-dom";

const AppSuggestion = () => {
  return (
    <div className="app-suggestion">
      <SectionTitle title="Lựa chọn của bạn" />
      <div className="px-4">
        <div className="text-center px-sm-5 px-0 lead mx-5 mt-3">
          HFS cung cấp 4 khẩu phần ăn có năng lượng là 300 Kcal, 400 Kcal, 500
          Kcal và 600 Kcal. Quý khách có thể lựa chọn khẩu phần ăn phù hợp với
          nhu cầu năng lượng của cơ thể. Liên hệ với HFS để được tư vấn chi tiết
          nhất
        </div>
        <div className="items my-4">
          <Link to="/menu" className="item">
            <img src={img1} alt="" />
            <div className="text">300 KCAL</div>
          </Link>
          <Link to="/menu" className="item">
            <img src={img2} alt="" />
            <div className="text">400 KCAL</div>
          </Link>
          <Link to="/menu" className="item">
            <img src={img3} alt="" />
            <div className="text">500 KCAL</div>
          </Link>
          <Link to="/menu" className="item">
            <img src={img4} alt="" />
            <div className="text">600 KCAL</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppSuggestion;
