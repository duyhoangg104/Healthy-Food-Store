/** @format */

import React from "react";
import { useSelector } from "react-redux";
import {
  convertGenderToVietnamese,
  convertRoleToVietnamese,
} from "../../../utils/helper";

const ViewInfo = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      <p className="mb-0">
        Chào {convertRoleToVietnamese(userInfo?.role?.value)}{" "}
        {userInfo?.fullName}
      </p>
      <p className="mt-0">Dưới đây là thông tin của bạn!</p>
      <div className="info my-5">
        <p className="d-inline-block border-bottom border-bototm-light">
          Thông Tin Tài Khoản
        </p>
        <div className="row mt-2">
          <div className="col-md-2">
            <strong>Họ Tên</strong>
          </div>
          <div className="col-md-10">
            <strong>{userInfo?.fullName}</strong>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-2">
            <strong>Email</strong>
          </div>
          <div className="col-md-10">
            <strong>{userInfo?.email}</strong>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-2">
            <strong>Số điện thoại</strong>
          </div>
          <div className="col-md-10">
            <strong>{userInfo?.phone}</strong>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-2">
            <strong>Ngày Sinh</strong>
          </div>
          <div className="col-md-10">
            <strong>{userInfo?.birthDate?.substr(0, 10)}</strong>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-2">
            <strong>Giới tính</strong>
          </div>
          <div className="col-md-10">
            <strong>{convertGenderToVietnamese(userInfo?.gender)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInfo;
