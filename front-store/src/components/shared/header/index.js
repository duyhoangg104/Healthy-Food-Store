/** @format */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../../assets/images/main_logo.png";
import Seacrh from "../search";
import "./index.scss";
import { useSelector } from "react-redux";
import CartLink from "./CartLink";
import FavoriteLink from "./FavoriteLink";
import Top from "./Top";

const Header = ({ isLoading }) => {
  const [isShowHeader, setIsShowHeader] = useState(true);
  const { pathname } = useLocation();
  const { userInfo, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/verify-email" ||
      pathname === "/reset-password" ||
      pathname.includes("/admin") ||
      pathname.includes("/manager") ||
      pathname.includes("/employee") ||
      pathname.includes("/shipper") ||
      pathname.includes("/confirm-register")
    ) {
      setIsShowHeader(false);
    } else {
      setIsShowHeader(true);
    }
  }, [pathname]);

  return (
    <header className={`main-header ${!isShowHeader ? "d-none" : ""}`}>
      <Top
        userInfo={userInfo}
        isLoading={isLoading}
        isAuthenticated={isAuthenticated}
      />
      <div className="container">
        <nav className="header-inner">
          <div className="logo-container">
            <NavLink to="/" activeClassName="nav-link__active">
              <img
                src={logo}
                alt="Thực phẩm , món ăn tốt cho sức khỏe của bạn"
              />
            </NavLink>
          </div>
          <Seacrh />
          <div className="nav-links">
            <ul>
              {userInfo?.favorites && (
                <FavoriteLink favorites={userInfo?.favorites || []} />
              )}
              {!isAuthenticated && (
                <li className="nav-link__item">
                  <NavLink to="/login" activeClassName="nav-link__active">
                    Đăng nhập
                  </NavLink>
                </li>
              )}
              <CartLink />
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  isLoading: PropTypes.bool,
};

export default Header;
