/** @format */

import React from "react";
import PropTypes from "prop-types";
import Modal from "../ui/modal";
import Backdrop from "../ui/backdrop";

const DeleteProductModal = ({
  open,
  close,
  product,
  onDeleteProduct,
  isLoading,
}) => {
  return (
    <>
      <Backdrop open={open} onClicked={close} isLoading={isLoading} />
      <Modal
        title="XÓA THỰC ĐƠN!"
        subtitle={`Bạn có chắc chắn xóa món ăn này, 
            ${product?.title || ""}?`}
        isLoading={isLoading}
        isOpen={open}
        close={close}
        onConfirm={onDeleteProduct}
      />
    </>
  );
};

DeleteProductModal.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  product: PropTypes.object,
  onDeleteProduct: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default DeleteProductModal;
