/** @format */

import React, { useEffect } from "react";
import "./styles/tdee.scss";
import { useSelector } from "react-redux";
import BottomBanner from "../../components/global/bottomBanner";
import TdeeForm from "../../components/global/TdeeForm";
import Loader from "../../components/ui/loader";
import TDEEResult from "./TDEEResult";
import { useHistory } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const CalcTDEE = () => {
  useDocumentTitle("Thông tin chỉ số  TDEE");
  const { tdeeData } = useSelector((state) => state.tdee);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const params = new URL(document.location).searchParams;
  const recalc = params.get("recalc");
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login?destination=ttde-calc");
    }
  }, [isAuthenticated]);

  return (
    <div className="calc-tdee my-5 pt-3">
      {tdeeData.isLoading && <Loader />}
      {!tdeeData.isLoading && (
        <>
          {tdeeData.data && !recalc ? (
            <TDEEResult data={tdeeData.data} />
          ) : (
            <div>
              <div className="text-center text-green px-5">
                <h4>Tìm hiểu xem bạn đốt cháy bao nhiêu calo mỗi ngày</h4>
                <p>
                  Sử dụng máy tính TDEE để tìm hiểu Tổng Chi tiêu Năng lượng
                  Hàng ngày của bạn, thước đo lượng calo <br />
                  bạn đốt mỗi ngày. Máy tính calo này cũng sẽ hiển thị BMI, BMR,
                  Macro và nhiều thống kê hữu ích khác của bạn!
                </p>
              </div>
              <div className="container">
                <TdeeForm />
              </div>
            </div>
          )}
        </>
      )}
      <BottomBanner />
    </div>
  );
};

export default CalcTDEE;
