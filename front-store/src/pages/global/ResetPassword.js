/** @format */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../../components/ui/logo";
import IconLoader from "../../components/ui/iconLoader";
import "./styles/register.scss";
import errorMessages from "../../constants/message";
import { useDispatch } from "react-redux";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { resetPasswordRequest } from "../../store/api/users";
import {
  handleShowMultipleErrors,
  handleShowNotification,
} from "../../utils/event";

const ResetPassword = () => {
  useDocumentTitle("Đổi mật khẩu");
  const params = new URL(document.location).searchParams;
  const email = params.get("email");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!email) {
      history.goBack();
    }
  }, [history, email]);

  const onValid = async (data) => {
    setIsLoading(true);
    try {
      const { data: dataRes } = await resetPasswordRequest(data);
      handleShowNotification(dataRes?.msg, "success", dispatch);
      history.push("/login");
    } catch (error) {
      if (error?.response?.data?.msg) {
        handleShowNotification(error?.response?.data?.msg, "error", dispatch);
      }
      if (error?.response?.data?.errors) {
        handleShowMultipleErrors(error?.response?.data?.errors, dispatch);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="page-title">
        <h1>ĐỔI MẬT KHẨU</h1>
      </div>
      <Logo link="/" />
      <form className="form" onSubmit={handleSubmit(onValid)}>
        <div className="input-container">
          <input
            type="text"
            className="input-item"
            placeholder="Mã xác thực"
            maxLength={6}
            {...register("code", {
              required: {
                value: true,
                message: errorMessages.requiredField,
              },
              minLength: {
                value: 6,
                message: "Vui lòng nhập tối thiểu 6 chữ số",
              },
            })}
          />
          {errors.code && (
            <div className="error-msg">{errors.code.message}</div>
          )}
        </div>
        <div className="input-container">
          <input
            type="password"
            className="input-item"
            placeholder="Mật khẩu mới"
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
        <div className="input-container">
          <input
            type="password"
            className="input-item"
            placeholder="Nhập lại mật khẩu mới"
            autoComplete="false"
            {...register("confirmPassword", {
              validate: (value) => {
                return (
                  value === watch("password") ||
                  errorMessages.passwordNotMatched
                );
              },
            })}
          />
          {errors.confirmPassword && (
            <div className="error-msg">{errors.confirmPassword.message}</div>
          )}
        </div>
        <div className="info my-4">
          <p>Mã xác thực đã được gửi đến email {email}</p>
        </div>
        <div className="submit-btn">
          <button
            className={`form-btn ${isLoading ? "divDisable" : ""}`}
            type="submit"
          >
            {isLoading && <IconLoader />} Xác nhận
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
