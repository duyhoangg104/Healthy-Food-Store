/** @format */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useRouteMatch } from "react-router-dom";
import Logo from "../ui/logo";
import "./index.scss";
import {
  AiFillPlusCircle,
  AiOutlineAreaChart,
  AiOutlineFileDone,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { RiCoupon2Line } from "react-icons/ri";
import { TiThListOutline } from "react-icons/ti";
import { hideSidebar } from "../../store/slice/uiSlice";
import LogoutModal from "../shared/logoutModal";

const ManagerSidebar = () => {
  const { path } = useRouteMatch();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loggingOut, setLoggingOut] = useState(false);

  return (
    <div className="admin-sidebar">
      <div className="top-logo">
        <Logo link="/manager" onClick={() => dispatch(hideSidebar())} />
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
              to={`${path}/account-info`}
              className={`sidebar-link__item`}
              activeClassName="sidebar-link__active"
              onClick={() => dispatch(hideSidebar())}
            >
              <AiOutlineUser size={22} /> <span>Tài khoản</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${path}/new-product`}
              className={`sidebar-link__item`}
              activeClassName="sidebar-link__active"
              onClick={() => dispatch(hideSidebar())}
            >
              <AiFillPlusCircle /> <span>Thêm thực đơn</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${path}/categories`}
              className={`sidebar-link__item`}
              activeClassName="sidebar-link__active"
              onClick={() => dispatch(hideSidebar())}
            >
              <TiThListOutline size={22} /> <span>Loại sản phẩm</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${path}/products`}
              className={`sidebar-link__item`}
              activeClassName="sidebar-link__active"
              onClick={() => dispatch(hideSidebar())}
            >
              <AiOutlineFileDone size={22} /> <span>Quản lý thực đơn</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${path}/customers`}
              className={`sidebar-link__item`}
              activeClassName="sidebar-link__active"
              onClick={() => dispatch(hideSidebar())}
            >
              <AiOutlineUsergroupAdd size={22} /> <span>Khách hàng</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${path}/coupons`}
              className={`sidebar-link__item`}
              activeClassName="sidebar-link__active"
              onClick={() => dispatch(hideSidebar())}
            >
              <RiCoupon2Line size={22} /> <span>QUẢN LÝ GIẢM GIÁ</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${path}/stats`}
              className={`sidebar-link__item`}
              activeClassName="sidebar-link__active"
              onClick={() => dispatch(hideSidebar())}
            >
              <AiOutlineAreaChart size={22} /> <span>Thống kê</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <LogoutModal open={loggingOut} close={() => setLoggingOut(false)} />
    </div>
  );
};

export default ManagerSidebar;
