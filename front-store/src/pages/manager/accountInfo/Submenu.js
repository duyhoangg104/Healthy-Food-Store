/** @format */

import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import "./index.scss";

const Submenu = () => {
  const { path } = useRouteMatch();
  return (
    <div className="submenu">
      <ul>
        <li>
          <NavLink to={`${path}`} exact activeClassName="submenu-active">
            Thông tin
          </NavLink>
        </li>
        <li>
          <NavLink to={`${path}/edit`} activeClassName="submenu-active">
            Cập nhật thông tin
          </NavLink>
        </li>
        <li>
          <NavLink to={`${path}/password`} activeClassName="submenu-active">
            Đổi mật khẩu
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Submenu;
