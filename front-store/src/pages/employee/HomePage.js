/** @format */

import React from "react";
import "./index.scss";
import { AiOutlineFileDone, AiOutlineUsergroupAdd } from "react-icons/ai";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const ManagerHomePage = () => {
  useDocumentTitle("Quản trị nhân viên");
  return (
    <div className="employee-home">
      <div className="page-title">
        <h1>Quản trị nhân viên</h1>
      </div>
      <div className="row-items">
        <div className="item">
          <div className="inner">
            <div className="icon">
              <AiOutlineFileDone size={48} />
            </div>
            <div className="text">
              <h3>Tài khoản</h3>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="inner">
            <div className="icon">
              <AiOutlineUsergroupAdd size={48} />
            </div>
            <div className="text">
              <h3>Quản lý đơn hàng</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerHomePage;
