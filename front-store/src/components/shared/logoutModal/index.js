/** @format */

import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../ui/modal";
import Backdrop from "../../ui/backdrop";
import { useHistory } from "react-router-dom";
import { logout } from "../../../store/slice/authSlice";
import { resetCart } from "../../../store/slice/cartSlice";
import { hideSidebar } from "../../../store/slice/uiSlice";
import { clearTdeeData } from "../../../store/slice/tdeeSlice";

const LogoutModal = ({ open, close }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <Backdrop open={open} onClicked={close} />
      <Modal
        title="Đăng xuất!"
        subtitle={`Bạn có chắc chắn muốn đăng xuất tài khoản
                ${userInfo.fullName}?`}
        isLoading={false}
        isOpen={open}
        close={close}
        onConfirm={() => {
          close();
          dispatch(logout(history));
          dispatch(resetCart());
          dispatch(clearTdeeData());
          dispatch(hideSidebar());
        }}
      />
    </>
  );
};

LogoutModal.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
};

export default LogoutModal;
