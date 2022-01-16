import React from "react";
import PropTypes from "prop-types";
import "./index.scss";
import { NavLink } from "react-router-dom";

const ProfileMenu = ({ path }) => {
  return (
    <div className="profile-menu">
      <div className="container">
        <div className="c-submenu shadow shadow-sm p-2 border border-green rounded d-flex align-items-center justify-content-between">
          <ul>
            <li>
              <NavLink
                to={`${path}/profile`}
                exact
                activeClassName="submenu-item__active"
              >
                Thông tin tài khoản
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${path}/password`}
                activeClassName="submenu-item__active"
              >
                Đổi mật khẩu
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${path}/orders`}
                activeClassName="submenu-item__active"
              >
                Lịch sử mua hàng
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${path}/tdee`}
                activeClassName="submenu-item__active"
              >
                Thông tin TDEE
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

ProfileMenu.propTypes = {
  path: PropTypes.string,
};

export default ProfileMenu;
