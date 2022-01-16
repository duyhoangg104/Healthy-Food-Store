/** @format */

import React from "react";
import PropTypes from "prop-types";
import actionIndexes from "../../constants/tdee";
import { numberFormatter } from "../../utils/helper";
import Summary from "../../components/global/tdeeResult/Summary";
import BmiTable from "../../components/global/tdeeResult/BmiTable";

const TDEEResult = ({ data }) => {
  const calcCalorPerday = (actionIndex, calor, currentIndex) => {
    return numberFormatter.format((calor * currentIndex) / actionIndex);
  };

  return (
    <div className="tdee-result px-4">
      <div className="page-title">
        <h1 className="text-green mb-4">Thông tin chỉ số của bạn</h1>
      </div>
      <Summary data={data} />
      <div className="divider green my-5" />
      <div className="info">
        <div className="page-title">
          <h1 className="text-green mb-5">
            Mức năng lượng (calories) duy trì của bạn là
          </h1>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="d-flex">
              <div className="calor-perday mb-3">
                <div>
                  <strong> {numberFormatter.format(data.tdee)} </strong>
                  <p>calor trên một ngày</p>
                </div>
                <div>
                  <strong> {numberFormatter.format(data.tdee * 7)} </strong>
                  <p>calor trên một tuần</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <p className="lead">
              Dựa trên số liệu thống kê của bạn, ước tính tốt nhất cho lượng
              calo duy trì của bạn là{" "}
              <strong> {numberFormatter.format(data.tdee)} </strong> calo mỗi
              ngày dựa trên Công thức Katch-McArdle, được biết đến rộng rãi là
              chính xác nhất khi cung cấp chất béo trong cơ thể.
            </p>
            <p className="lead">
              Bảng dưới đây cho thấy sự khác biệt nếu bạn đã chọn một cấp độ
              hoạt động khác.
            </p>
            <div className="action-index__table mb-5 px-5">
              {actionIndexes.map((item) => (
                <div
                  className={`item ${
                    data.actionIndex === item.value ? "active" : ""
                  }`}
                  key={item.id}
                >
                  <p className="left-block">{item.text}</p>
                  <p className="center-block">
                    {calcCalorPerday(data.actionIndex, data.tdee, item.value)}
                  </p>
                  <p>calor / ngày</p>
                </div>
              ))}
            </div>
            <BmiTable data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

TDEEResult.propTypes = {
  data: PropTypes.object,
};

export default TDEEResult;
