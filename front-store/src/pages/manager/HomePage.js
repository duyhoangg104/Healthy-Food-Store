/** @format */

import React from "react";
import "./index.scss";
import {
  AiFillPlusCircle,
  AiOutlineAreaChart,
  AiOutlineFileDone,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const ManagerHomePage = () => {
  useDocumentTitle("Quản trị Manager");

  return (
    <div className="manager-home">
      <div className="inner">
        <div className="page-title">
          <h1>Quản trị Manager</h1>
        </div>
        <div className="row-items">
          <div className="item">
            <div className="inner">
              <div className="icon">
                <AiFillPlusCircle size={48} />
              </div>
              <div className="text">
                <h3>Thêm món ăn</h3>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="inner">
              <div className="icon">
                <AiOutlineFileDone size={48} />
              </div>
              <div className="text">
                <h3>Danh sách món ăn</h3>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="inner">
              <div className="icon">
                <AiOutlineUsergroupAdd size={48} />
              </div>
              <div className="text">
                <h3>Khách hàng</h3>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="inner">
              <div className="icon">
                <AiOutlineAreaChart size={48} />
              </div>
              <div className="text">
                <h3>Thống kê</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerHomePage;
