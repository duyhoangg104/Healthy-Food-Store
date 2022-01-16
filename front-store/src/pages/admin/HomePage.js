/** @format */

import React from "react";
import "./index.scss";
import {
  AiFillCar,
  AiFillPlusCircle,
  AiOutlineUsergroupAdd,
  AiOutlineUserSwitch,
} from "react-icons/ai";

const AdminHomePage = () => {
  return (
    <div className="admin-home">
      <div className="page-title my-3">
        <h1>Quản trị Administrator</h1>
      </div>
      <div className="row-items">
        <div className="item">
          <div className="inner">
            <div className="icon">
              <AiFillPlusCircle size={48} />
            </div>
            <div className="text">
              <h3>Tạo mới tài khoản</h3>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="inner">
            <div className="icon">
              <AiOutlineUserSwitch size={48} />
            </div>
            <div className="text">
              <h3>Quản lý nhân viên</h3>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="inner">
            <div className="icon">
              <AiFillCar size={48} />
            </div>
            <div className="text">
              <h3>Quản lý shipper</h3>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="inner">
            <div className="icon">
              <AiOutlineUsergroupAdd size={48} />
            </div>
            <div className="text">
              <h3>Quản lý phòng ban</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
