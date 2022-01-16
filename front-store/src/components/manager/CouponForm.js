/** @format */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../ui/modal";
import Backdrop from "../ui/backdrop";
import "./index.scss";
import { useForm } from "react-hook-form";
import errorMessages from "../../constants/message";
import IconLoader from "../ui/iconLoader";
import {
  activeClassName,
  convertCouponTypeToVietnamese,
} from "../../utils/helper";
import { AiOutlineCalendar } from "react-icons/ai";
import Calendar from "react-calendar";
import ClickOusideWrapper from "../shared/ClickOusideWrapper";
import "react-calendar/dist/Calendar.css";

const CouponFormModal = ({
  open,
  close,
  onSubmitCouponForm,
  isLoading,
  selectedCoupon,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [expiredDate, onChangeExpiredDate] = useState(new Date());
  const [showExpiredDate, setShowExpiredDate] = useState(false);

  useEffect(() => {
    if (selectedCoupon) {
      setValue("value", selectedCoupon.value);
      setValue("percent", selectedCoupon.percent);
      setValue("type", selectedCoupon.type);
      onChangeExpiredDate(new Date(selectedCoupon.expiredDate));
    }

    return () => {
      reset();
      onChangeExpiredDate(new Date());
    };
  }, [selectedCoupon]);

  const onValid = (data) => {
    const submitData = {
      ...data,
      expiredDate,
    };
    if (selectedCoupon) {
      submitData.id = selectedCoupon._id;
    }
    onSubmitCouponForm(submitData, () => {
      onChangeExpiredDate(new Date());
    });
  };

  const percentArr = Array(20)
    .fill(1)
    .map((_, index) => (index + 1) * 5);

  return (
    <>
      <Backdrop open={open} onClicked={close} isLoading={isLoading} />
      <Modal
        title={selectedCoupon ? "Chỉnh sửa mã giảm giá" : "Thêm mã giảm giá"}
        isLoading={isLoading}
        isOpen={open}
        close={close}
        hideSubmit
      >
        <div className="coupon-form">
          <form className="form form-full" onSubmit={handleSubmit(onValid)}>
            <div className="input-container">
              <label>Mã giảm giá</label>
              <input
                type="text"
                maxLength={10}
                className={`input-item ${errors.value ? "required" : ""}`}
                {...register("value", {
                  required: {
                    value: true,
                    message: errorMessages.requiredField,
                  },
                })}
              />
              {errors.value && (
                <div className="error-msg">{errors.value.message}</div>
              )}
            </div>
            <div className="input-container">
              <label>Loại</label>
              <select
                className={`input-item select ${errors.type ? "required" : ""}`}
                {...register("type")}
              >
                {["order", "ship"].map((type) => (
                  <option value={type} key={type}>
                    {convertCouponTypeToVietnamese(type)}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-container">
              <label>Giảm giá (%)</label>
              <select
                className={`input-item w-30 ${
                  errors.percent ? "required" : ""
                }`}
                {...register("percent")}
              >
                {percentArr.map((percent) => (
                  <option value={percent} key={percent}>
                    {percent}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-container">
              <label>Ngày hết hạn</label>
              <div className="date-block">
                <div
                  className="date start-date shadow-sm rounded"
                  onClick={() => setShowExpiredDate(true)}
                >
                  <span> {expiredDate.toLocaleDateString()} </span>
                  <span>
                    <AiOutlineCalendar size={24} />
                  </span>
                </div>
                <div className="abs-position">
                  {showExpiredDate && (
                    <ClickOusideWrapper
                      callback={() => setShowExpiredDate(false)}
                    >
                      <Calendar
                        onChange={(value) => {
                          onChangeExpiredDate(value);
                          setShowExpiredDate(false);
                        }}
                        value={expiredDate}
                        locale="vi"
                        minDate={new Date()}
                      />
                    </ClickOusideWrapper>
                  )}
                </div>
              </div>
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

CouponFormModal.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  onSubmitCouponForm: PropTypes.func,
  isLoading: PropTypes.bool,
  selectedCoupon: PropTypes.object,
};

export default CouponFormModal;
