import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./index.scss";
import { useDispatch } from "react-redux";
import errorMessages from "../../../constants/message";
import { activeClassName } from "../../../utils/helper";
import {
  handleShowNotification,
  handleShowMultipleErrors,
} from "../../../utils/event";
import { updateAddressInfoRequest } from "../../../store/api";
import { updateAddressInfo } from "../../../store/slice/authSlice";
import { vietnamesePhoneNumberRegex } from "../../../constants/regex";
import { useForm } from "react-hook-form";

const DeliveryAddress = ({ userInfo }) => {
  const [editting, setEditting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const onEditShippingAddress = async (updateData) => {
    setIsLoading(true);
    try {
      const { data } = await updateAddressInfoRequest(updateData);
      handleShowNotification(data.msg, "success", dispatch);
      dispatch(updateAddressInfo(updateData));
      setEditting(false);
    } catch (error) {
      if (error?.response?.data?.errors) {
        handleShowMultipleErrors(error?.response?.data?.errors, dispatch);
      }
      if (error?.response?.data?.msg) {
        handleShowNotification(error?.response?.data?.msg, "error", dispatch);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo?._id) {
      setValue("name", userInfo?.fullName);
      setValue("address", userInfo?.address);
      setValue("phone", userInfo?.phone);
    }
  }, [userInfo.fullName]);

  return (
    <form
      className={`"delivery-address border-green rounded-10 shadow mb-4 ${activeClassName(
        isLoading,
        "divDisable divDisableWhite",
        ""
      )}`}
      onSubmit={handleSubmit(onEditShippingAddress)}
    >
      <div className="address-header">
        <div className="d-flex align-items-center justify-content-between p-2 border-bottom px-3">
          <p className="mb-0">Thông tin giao hàng</p>
          {editting ? (
            <button type="submit" className="btn btn-link">
              Lưu
            </button>
          ) : (
            <a
              href="/checkout"
              type="button"
              className="btn btn-link"
              onClick={(e) => {
                e.preventDefault();
                setEditting(true);
              }}
            >
              Sửa
            </a>
          )}
        </div>
      </div>
      <div className="p-2 px-3">
        {editting ? (
          <div className="edit-form">
            <div>
              <div className="d-flex align-items-center justify-content-between mb-2 divDisable divDisableWhite">
                <p className="mb-0">Họ và tên người nhận</p>
                <input
                  type="text"
                  className="w-50 px-1"
                  maxLength={24}
                  autoComplete="off"
                  defaultValue={userInfo?.fullName}
                />
              </div>
              {errors?.name && (
                <div className="error-msg">{errors?.name?.message}</div>
              )}
            </div>
            <div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <p className="mb-0">Địa chỉ</p>
                <textarea
                  {...register("address", {
                    required: {
                      value: true,
                      message: errorMessages.requiredField,
                    },
                  })}
                  cols="30"
                  rows="2"
                  className="px-1"
                  autoComplete="off"
                />
              </div>
              {errors?.address && (
                <div className="error-msg">{errors?.address?.message}</div>
              )}
            </div>
            <div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <p className="mb-0">Điện thoại</p>
                <input
                  type="text"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: errorMessages.requiredField,
                    },
                    pattern: {
                      value: vietnamesePhoneNumberRegex,
                      message: "Vui lòng nhập SDT hợp lệ",
                    },
                  })}
                  className="px-1"
                  autoComplete="off"
                />
              </div>
              {errors?.phone && (
                <div className="error-msg">{errors?.phone?.message}</div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h5 className="fw-bold">{watch("name") || userInfo?.fullName}</h5>
            <p className="mb-2">
              {watch("address") || userInfo?.address || "Chưa có địa chỉ "}
            </p>
            <p className="mb-2"> {watch("phone") || userInfo?.phone} </p>
          </div>
        )}
      </div>
    </form>
  );
};

DeliveryAddress.propTypes = {
  userInfo: PropTypes.object,
};

export default DeliveryAddress;
