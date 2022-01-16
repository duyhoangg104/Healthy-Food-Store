/** @format */

import roles from "../constants/role";
import { logout } from "../store/slice/authSlice";
import { resetCart } from "../store/slice/cartSlice";
import { clearTdeeData } from "../store/slice/tdeeSlice";

export const redirectUser = (userInfo, history, destination = "") => {
  const pathname = window.location.pathname;
  if (userInfo?.role?.value === roles.ADMIN_ROLE) {
    if (!pathname.includes("/admin")) {
      history.push("/admin");
    }
  }
  if (userInfo?.role?.value === roles.SHIPPER_ROLE) {
    if (!pathname.includes("/shipper")) {
      history.push("/shipper");
    }
  }
  if (userInfo?.role?.value === roles.MANAGER_ROLE) {
    if (!pathname.includes("/manager")) {
      history.push("/manager");
    }
  }
  if (userInfo?.role?.value === roles.EMPLOYEE_ROLE) {
    if (!pathname.includes("/employee")) {
      history.push("/employee");
    }
  }
  if (userInfo?.role?.value === roles.CUSTOMER_ROLE) {
    if (destination) {
      history.push(destination);
      return;
    }
    if (pathname.includes("/login")) {
      history.push("/");
    }
  }
};

export const handleUnauthorizedRedirect = (code, history, dispatch) => {
  if (code === 401) {
    history.push("/login");
    dispatch(logout());
    dispatch(resetCart());
    dispatch(clearTdeeData());
  }
};
