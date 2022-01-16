import jwt_decode from "jwt-decode";
import { logout } from "../store/slice/authSlice";
import { resetCart } from "../store/slice/cartSlice";
import { clearTdeeData } from "../store/slice/tdeeSlice";
import { handleShowNotification } from "./event";

export const checkTokenExpiration = (token, dispatch) => {
  if (token) {
    const decoded = jwt_decode(token);
    if (decoded.exp < Date.now() / 1000) {
      dispatch(logout());
      dispatch(resetCart());
      dispatch(clearTdeeData());
      handleShowNotification("Phiên đăng nhập hết hạn", "error", dispatch);
    }
  }
};

export const autoLogoutWhenTokenExpired = (token, dispatch, history) => {
  if (token) {
    const decoded = jwt_decode(token);
    const timer = decoded.exp * 1000 - Date.now();
    if (timer > 0) {
      setTimeout(() => {
        dispatch(logout());
        dispatch(resetCart());
        dispatch(clearTdeeData());
        handleShowNotification("Phiên đăng nhập hết hạn", "error", dispatch);
        history.push("/login");
      }, timer);
    }
  }
};
