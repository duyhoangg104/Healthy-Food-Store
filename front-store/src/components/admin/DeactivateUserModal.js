/** @format */

import React from "react";
import PropTypes from "prop-types";
import Modal from "../ui/modal";
import Backdrop from "../ui/backdrop";

const DeactivateUserModal = ({
  open,
  close,
  user,
  onDeactivateUser,
  isLoading,
}) => {
  return (
    <>
      <Backdrop open={open} onClicked={close} isLoading={isLoading} />
      <Modal
        title="Kích hoạt cho khách hàng"
        subtitle={`Bạn có chắc chắn muốn ${
          user.isActivated ? "khóa tài khoản" : "mở khóa tài khoản"
        } 
                ${user?.email || ""}?`}
        isLoading={isLoading}
        isOpen={open}
        close={close}
        onConfirm={onDeactivateUser}
      />
    </>
  );
};

DeactivateUserModal.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  user: PropTypes.object,
  onDeactivateUser: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default DeactivateUserModal;
