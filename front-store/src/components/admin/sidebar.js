/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useRouteMatch } from "react-router-dom";
import logo from "../../assets/images/main_logo.png";
import "./index.scss";
import {
  AiFillCar,
  AiFillPlusCircle,
  AiOutlineUsergroupAdd,
  AiOutlineUserSwitch,
} from "react-icons/ai";
import LogoutModal from "../shared/logoutModal";
import { hideSidebar } from "../../store/slice/uiSlice";

const AdminSidebar = () => {
  const { path } = useRouteMatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [loggingOut, setLoggingOut] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="admin-sidebar">
      <div className="top-logo__admin">
        <Link to="/admin" onClick={() => dispatch(hideSidebar())}>
          <img src={logo} alt="sidebar admin logo" />
        </Link>
      </div>
      <div className="info p-3">
        <div className="d-flex justify-content-between align-items-center">
          <strong>{userInfo?.fullName}</strong>
          <button className="btn-sidebar" onClick={() => setLoggingOut(true)}>
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="50" height="50" fill="#427F50" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.4167 6.25H39.5833C41.875 6.25 43.75 8.125 43.75 10.4167V39.5833C43.75 41.875 41.875 43.75 39.5833 43.75H10.4167C8.10417 43.75 6.25 41.875 6.25 39.5833V31.25H10.4167V39.5833H39.5833V10.4167H10.4167V18.75H6.25V10.4167C6.25 8.125 8.10417 6.25 10.4167 6.25ZM23.9583 35.4167L21.0208 32.4792L26.3958 27.0833H6.25V22.9167H26.3958L21.0208 17.5208L23.9583 14.5833L34.375 25L23.9583 35.4167Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="sidebar-links">
        <ul>
          <li>
            <NavLink
              to={`${path}/new-account`}
              className={`sidebar-link__item`}
              activeClassName="sidebar-link__active"
              onClick={() => dispatch(hideSidebar())}
            >
              <AiFillPlusCircle size={22} /> <span>Tạo tài khoản</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${path}/employee`}
              className={`sidebar-link__item`}
              activeClassName="sidebar-link__active"
              onClick={() => dispatch(hideSidebar())}
            >
              <AiOutlineUserSwitch /> <span>Nhân viên</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${path}/shipper`}
              className={`sidebar-link__item`}
              activeClassName="sidebar-link__active"
              onClick={() => dispatch(hideSidebar())}
            >
              <AiFillCar size={22} /> <span>Shipper</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${path}/manager`}
              className={`sidebar-link__item`}
              activeClassName="sidebar-link__active"
              onClick={() => dispatch(hideSidebar())}
            >
              <AiOutlineUsergroupAdd size={22} /> <span>Quản lý</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <LogoutModal open={loggingOut} close={() => setLoggingOut(false)} />
    </div>
  );
};

export default AdminSidebar;
