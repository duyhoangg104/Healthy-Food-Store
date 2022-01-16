/** @format */

import React, { useEffect, useState } from "react";
import "./index.scss";
import { NavLink, useLocation } from "react-router-dom";
import ClickOusideWrapper from "../ClickOusideWrapper";
import { useGetCategoryListQuery } from "../../../store/services/products";
import { useSelector } from "react-redux";
import { activeClassName } from "../../../utils/helper";

const Submenu = () => {
  const { data, isLoading } = useGetCategoryListQuery("normal", {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [isShowSubmenu, setIsShowSubmenu] = useState(true);
  const { pathname } = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

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
      setIsShowSubmenu(false);
    } else {
      setIsShowSubmenu(true);
    }
  }, [pathname]);

  const [showSubmenu, setShowSubmenu] = useState(false);

  const closeMenu = () => setShowSubmenu(false);

  return (
    <div className={`container ${isShowSubmenu ? "" : "d-none"}`}>
      <div className="c-submenu d-flex align-items-center justify-content-center">
        <ul className="shadow shadow-sm p-3 border border-light">
          <li>
            <NavLink to="/" exact activeClassName="submenu-item__active">
              Home
            </NavLink>
          </li>
          <li className="position-relative">
            <NavLink
              to="/menu"
              activeClassName={`submenu-item__active ${
                isLoading ? "divDisable divDisableWhite" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setShowSubmenu(true);
              }}
            >
              Menu
            </NavLink>
            {showSubmenu && (
              <ClickOusideWrapper callback={closeMenu}>
                <ul className="menu-menu">
                  <li
                    className={`nav-link__item ${activeClassName(
                      isAuthenticated,
                      "",
                      "d-none"
                    )}`}
                  >
                    <NavLink
                      to="/meal"
                      onClick={closeMenu}
                      activeClassName="nav-link__active"
                    >
                      Thực đơn theo yêu cầu
                    </NavLink>
                  </li>
                  <li className="nav-link__item">
                    <NavLink
                      to="/menu"
                      onClick={closeMenu}
                      activeClassName="nav-link__active"
                    >
                      Combo có sẵn
                    </NavLink>
                  </li>
                  {data?.map((category) => (
                    <li key={category._id} className="nav-link__item">
                      <NavLink
                        to={`/menu?cId=${category._id}`}
                        onClick={closeMenu}
                        activeClassName="nav-link__active"
                      >
                        {category?.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </ClickOusideWrapper>
            )}
          </li>
          <li>
            <NavLink to="/ttde-calc" activeClassName="submenu-item__active">
              TDEE Calculator
            </NavLink>
          </li>
          <li>
            <NavLink to="/faq" activeClassName="submenu-item__active">
              FAQ
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" activeClassName="submenu-item__active">
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Submenu;
