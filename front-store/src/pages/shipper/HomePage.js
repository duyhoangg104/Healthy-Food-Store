/** @format */

import React from "react";
import "./index.scss";
import { AiOutlineFileDone, AiOutlineHistory } from "react-icons/ai";
import { MdArrowDownward } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const ManagerHomePage = () => {
  useDocumentTitle("Quản trị shipper");
  return (
    <div className="employee-home">
      <div className="page-title">
        <h1>Quản trị shipper</h1>
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
              <FaShippingFast size={48} />
            </div>
            <div className="text">
              <h3>ĐƠN CHỜ GIAO</h3>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="inner">
            <div className="icon">
              <MdArrowDownward size={48} />
            </div>
            <div className="text">
              <h3>ĐƠN CHỜ NHẬN</h3>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="inner">
            <div className="icon">
              <AiOutlineHistory size={48} />
            </div>
            <div className="text">
              <h3>Lịch sử giao hàng</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerHomePage;
