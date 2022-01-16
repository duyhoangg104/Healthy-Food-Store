/** @format */

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../../components/ui/logo";
import "./styles/register.scss";
import errorMessages from "../../constants/message";
import { useDispatch } from "react-redux";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { confirmRegisterRequest } from "../../store/api";
import {
  handleShowMultipleErrors,
  handleShowNotification,
} from "../../utils/event";
import IconLoader from "../../components/ui/iconLoader";

const ConfirmRegister = () => {
  useDocumentTitle("Xác nhận đăng ký");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const params = new URL(document.location).searchParams;
  const email = params.get("email");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      history.goBack();
    }
  }, [history, email]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { data: dataRes } = await confirmRegisterRequest({
        code: data.code,
        email,
      });
      handleShowNotification(dataRes?.msg, "success", dispatch);
      history.push("/login");
    } catch (error) {
      if (error?.response?.data?.errors) {
        handleShowMultipleErrors(error?.response?.data?.errors, dispatch);
      } else {
        handleShowNotification(
          error?.response?.data?.msg || error?.message,
          "error",
          dispatch
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="page-title">
        <h1>Xác nhận đăng ký</h1>
      </div>
      <Logo link="/" />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <input
            type="text"
            className="input-item"
            placeholder="OTP Code"
            {...register("code", {
              required: {
                value: true,
                message: errorMessages.requiredField,
              },
              minLength: {
                value: 6,
                message: "Vui lòng nhập tối thiểu 6 ký tự",
              },
              maxLength: {
                value: 6,
                message: "Vui lòng nhập tối đa 6 ký tự",
              },
            })}
          />
          <small className="text-end text-muted d-block mt-2">
            Nhập mã xác thực
          </small>
          {errors.code && (
            <div className="error-msg">{errors.code.message}</div>
          )}
        </div>
        <div className="submit-btn">
          <button
            className={`form-btn ${isLoading ? "divDisable" : ""}`}
            type="submit"
          >
            {isLoading && <IconLoader />} Xác nhận
          </button>
        </div>
        <div className="actions">
          <div className="d-flex justify-content-center">
            <div>
              <p className="mb-0">Đã có tài khoản?</p>
              <Link to="/login">Đăng nhập!</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ConfirmRegister;
