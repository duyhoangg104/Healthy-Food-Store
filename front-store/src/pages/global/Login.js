/** @format */

import React, { useEffect } from "react";
import "./styles/login.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../components/ui/logo";
import errorMessages from "../../constants/message";
import { resetAuthState } from "../../store/slice/authSlice";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { authUserAction } from "../../store/actions/auth";
import { redirectUser } from "../../utils/redirect";
import { handleShowNotification } from "../../utils/event";
import IconLoader from "../../components/ui/iconLoader";

const Login = () => {
  useDocumentTitle("Đăng nhập");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isLoading, success, error, isAuthenticated, userInfo } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const params = new URL(document.location).searchParams;
  const destination = params.get("destination");

  useEffect(() => {
    if (success) {
      handleShowNotification("Đăng nhập thành công", "success", dispatch);
      dispatch(resetAuthState());
    }
    if (error) {
      handleShowNotification(
        error?.msg || "Đăng nhập thất bại",
        "error",
        dispatch
      );
    }
  }, [success, dispatch, error]);

  useEffect(() => {
    if (isAuthenticated) {
      redirectUser(userInfo, history, destination);
    }
  }, [history, userInfo?.role, isAuthenticated]);

  const onValid = (data) => {
    dispatch(authUserAction(data));
  };

  return (
    <div className="login-wrapper">
      <div className="page-title">
        <h1>Đăng nhập tài khoản</h1>
      </div>
      <Logo link="/" />
      <form className="form" onSubmit={handleSubmit(onValid)}>
        <div className="input-container">
          <input
            type="email"
            className="input-item"
            placeholder="Email"
            maxLength={50}
            {...register("email", {
              required: {
                value: true,
                message: errorMessages.requiredField,
              },
              pattern: {
                value:
                  //eslint-disable-next-line
                  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                message: errorMessages.inValidEmail,
              },
            })}
          />
          {errors.email && (
            <div className="error-msg">{errors.email.message}</div>
          )}
        </div>
        <div className="input-container">
          <input
            type="password"
            className="input-item"
            placeholder="Mật khẩu"
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
        <div className="actions">
          <div className="d-flex justify-content-between">
            <div>
              <p className="mb-0">Chưa có tài khoản?</p>
              <Link to="/register">Đăng kí!</Link>
            </div>
            <div>
              <Link to="/verify-email">Quên mật khẩu?</Link>
            </div>
          </div>
        </div>
        <div className="submit-btn">
          <button
            className={`form-btn ${isLoading ? "divDisable" : ""}`}
            type="submit"
          >
            {isLoading ? <IconLoader /> : ""} Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
