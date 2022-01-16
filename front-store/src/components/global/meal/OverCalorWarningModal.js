import React from "react";
import PropTypes from "prop-types";
import Backdrop from "../../ui/backdrop";
import Modal from "../../ui/modal";

const OverCalorWarningModal = ({ open, close, isLoading, onConfirm }) => {
  return (
    <>
      <Backdrop
        open={open}
        onClicked={close}
        isLoading={isLoading}
        disableClose
      />
      <Modal
        title="Cảnh báo!"
        subtitle={`Bạn đã nhập quá số lượng calo trong bữa ăn này. Bạn có muốn sửa lại thực đơn?`}
        isLoading={isLoading}
        isOpen={open}
        close={close}
        onConfirm={onConfirm}
      />
    </>
  );
};

OverCalorWarningModal.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  isLoading: PropTypes.bool,
  onConfirm: PropTypes.func,
};

export default OverCalorWarningModal;
