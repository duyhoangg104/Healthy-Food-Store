/** @format */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import ClickOusideWrapper from "../ClickOusideWrapper";
import LogoutModal from "../logoutModal";

const Top = ({ isLoading, isAuthenticated, userInfo }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const closeMenu = () => setShowSubmenu(false);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="header-top shadow shadow-sm py-3 px-3 top-links">
      <ul className="d-flex justify-content-end">
        {!isLoading && (
          <>
            <li className="nav-link__item pe-3 border-end border-2 position-relative">
              <NavLink
                to="/profile"
                activeClassName="nav-link__active"
                onClick={(e) => {
                  e.preventDefault();
                  setShowSubmenu(true);
                }}
              >
                {userInfo?.fullName}
              </NavLink>
              {showSubmenu && (
                <ClickOusideWrapper callback={closeMenu}>
                  <ul className="user-menu">
                    <li className="nav-link__item">
                      <NavLink
                        activeClassName="nav-link__active"
                        to={"/customer-profile/profile"}
                        onClick={closeMenu}
                      >
                        Thông tin tài khoản
                      </NavLink>
                    </li>
                    <li className="nav-link__item">
                      <NavLink
                        activeClassName="nav-link__active"
                        to={"/customer-profile/password"}
                        onClick={closeMenu}
                      >
                        Đổi mật khẩu
                      </NavLink>
                    </li>
                    <li className="nav-link__item">
                      <NavLink
                        activeClassName="nav-link__active"
                        to={"/customer-profile/orders"}
                        onClick={closeMenu}
                      >
                        Lịch sử mua hàng
                      </NavLink>
                    </li>
                    <li className="nav-link__item">
                      <NavLink
                        activeClassName="nav-link__active"
                        to={"/customer-profile/tdee"}
                        onClick={closeMenu}
                      >
                        Thông tin TDEE
                      </NavLink>
                    </li>
                  </ul>
                </ClickOusideWrapper>
              )}
            </li>
            <li className="nav-link__item ps-1">
              <NavLink
                to="/login"
                onClick={(e) => {
                  e.preventDefault();
                  setLoggingOut(true);
                }}
                activeClassName="nav-link__active"
              >
                Đăng xuất
              </NavLink>
            </li>
          </>
        )}
      </ul>
      <LogoutModal open={loggingOut} close={() => setLoggingOut(false)} />
    </div>
  );
};

Top.propTypes = {
  isLoading: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  userInfo: PropTypes.object,
};

export default Top;
