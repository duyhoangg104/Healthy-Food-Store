/** @format */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../ui/modal";
import Backdrop from "../ui/backdrop";
import "./index.scss";
import { useForm } from "react-hook-form";
import errorMessages from "../../constants/message";
import IconLoader from "../ui/iconLoader";
import { activeClassName } from "../../utils/helper";

const NewCategoryModal = ({
  open,
  close,
  onCreateNewCategory,
  isLoading,
  selectedCategory,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (selectedCategory) {
      setValue("title", selectedCategory.title);
      setValue("description", selectedCategory.description);
      setValue("status", selectedCategory.status);
    }
    return () => reset();
  }, [selectedCategory]);

  const onValid = (data) => {
    onCreateNewCategory(data, reset);
  };

  return (
    <>
      <Backdrop open={open} onClicked={close} isLoading={isLoading} />
      <Modal
        title={`${selectedCategory ? "Cập nhật" : "Thêm mới"} loại sản phẩm`}
        subtitle="Vui lòng nhâp thông tin loại sản phẩm"
        isLoading={isLoading}
        isOpen={open}
        close={close}
        hideSubmit
      >
        <div className="new-category__form">
          <form className="form form-full" onSubmit={handleSubmit(onValid)}>
            <div className="input-container">
              <label>Tiêu đề </label>
              <input
                type="text"
                maxLength={60}
                className={`input-item ${errors.title ? "required" : ""}`}
                {...register("title", {
                  required: {
                    value: true,
                    message: errorMessages.requiredField,
                  },
                })}
              />
              {errors.title && (
                <div className="error-msg">{errors.title.message}</div>
              )}
            </div>
            <div className="input-container">
              <label>Mô tả</label>
              <input
                type="text"
                className={`input-item ${errors.description ? "required" : ""}`}
                {...register("description", {
                  required: {
                    value: true,
                    message: errorMessages.requiredField,
                  },
                })}
              />
              {errors.description && (
                <div className="error-msg">{errors.description.message}</div>
              )}
            </div>
            <div className="input-container">
              <label>Loại</label>
              <select
                className={`input-item ${errors.status ? "required" : ""}`}
                {...register("status")}
              >
                <option value="normal">Normal</option>
                <option value="combo">Combo</option>
              </select>
            </div>
            <div className="input-container">
              <button
                className={`btn-green btn-full mt-3 ${activeClassName(
                  isLoading,
                  "divDisable"
                )}`}
                type="submit"
              >
                {isLoading && <IconLoader />} Xác Nhận
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

NewCategoryModal.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  onCreateNewCategory: PropTypes.func,
  isLoading: PropTypes.bool,
  selectedCategory: PropTypes.object,
};

export default NewCategoryModal;
