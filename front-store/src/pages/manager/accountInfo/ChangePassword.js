/** @format */

import React, { useEffect } from "react";
import "./index.scss";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import errorMessages from "../../../constants/message";
import { updateMyPasswordAction } from "../../../store/actions/users";
import { resetUpdateMyPasswordState } from "../../../store/slice/authSlice";
import {
  handleShowMultipleErrors,
  handleShowNotification,
} from "../../../utils/event";
import IconLoader from "../../../components/ui/iconLoader";

const ChangePassword = ({ btnText, wrapperClass }) => {
  const { updatePassword } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (updatePassword.success) {
      reset();
      handleShowNotification(updatePassword.data?.msg, "success", dispatch);
      dispatch(resetUpdateMyPasswordState());
    }
    if (updatePassword.error?.errors) {
      handleShowMultipleErrors(updatePassword.error.errors, dispatch);
    }
    if (updatePassword.error && !updatePassword.error.errors) {
      handleShowNotification(
        updatePassword?.error?.msg || "Cập nhật thông tin thất bại",
        "error",
        dispatch
      );
    }
  }, [updatePassword, dispatch]);

  const onSubmit = (data) => {
    dispatch(updateMyPasswordAction(data));
  };

  return (
    <div>
      <div className={`edit-info my-2 w-sm-75 mx-auto ${wrapperClass || ""}`}>
        <form className="form form-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="row mt-2 align-items-center">
            <div className="col-md-2">
              <strong>Mật khẩu cũ</strong>
            </div>
            <div className="col-md-8">
              <div className="input-container">
                <input
                  type="password"
                  className="input-item"
                  autoComplete="false"
                  maxLength={32}
                  {...register("password", {
                    required: {
                      value: true,
                      message: errorMessages.requiredField,
                    },
                    minLength: {
                      value: 8,
                      message: "Vui lòng nhập tối thiểu 8 ký tự",
                    },
                    maxLength: {
                      value: 32,
                      message: "Vui lòng nhập tối đa 32 ký tự",
                    },
                  })}
                />
                {errors.password && (
                  <div className="error-msg">{errors.password.message}</div>
                )}
              </div>
            </div>
          </div>
          <div className="row mt-2 align-items-center">
            <div className="col-md-2">
              <strong>Mật khẩu mới</strong>
            </div>
            <div className="col-md-8">
              <div className="input-container">
                <input
                  type="password"
                  className="input-item"
                  autoComplete="false"
                  maxLength={32}
                  {...register("newPassword", {
                    required: {
                      value: true,
                      message: errorMessages.requiredField,
                    },
                    minLength: {
                      value: 8,
                      message: "Vui lòng nhập tối thiểu 8 ký tự",
                    },
                    maxLength: {
                      value: 32,
                      message: "Vui lòng nhập tối đa 32 ký tự",
                    },
                  })}
                />
                {errors.newPassword && (
                  <div className="error-msg">{errors.newPassword.message}</div>
                )}
              </div>
            </div>
          </div>
          <div className="row mt-2 align-items-center">
            <div className="col-md-2">
              <strong>Nhập lại mật khẩu mới</strong>
            </div>
            <div className="col-md-8">
              <div className="input-container">
                <input
                  type="password"
                  className="input-item"
                  autoComplete="false"
                  {...register("confirmPassword", {
                    validate: (value) => {
                      return (
                        value === watch("newPassword") ||
                        errorMessages.passwordNotMatched
                      );
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <div className="error-msg">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="submit-btn">
            <button
              className={`form-btn ${
                updatePassword.isLoading ? "divDisable" : ""
              }`}
              type="submit"
            >
              {updatePassword.isLoading && <IconLoader />}{" "}
              {btnText || "Xác nhận"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ChangePassword.propTypes = {
  btnText: PropTypes.string,
  wrapperClass: PropTypes.string,
};

export default ChangePassword;
