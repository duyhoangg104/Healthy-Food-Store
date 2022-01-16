/** @format */

import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../../components/ui/logo";
import "./styles/register.scss";
import errorMessages from "../../constants/message";
import {
  formatNumberWithZeroPrefix,
  renderOptionList,
} from "../../utils/helper";
import { useSelector, useDispatch } from "react-redux";
import { resetRegisterState } from "../../store/slice/authSlice";
import { handleShowNotification } from "../../utils/event";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { registerUserAction } from "../../store/actions/auth";
import IconLoader from "../../components/ui/iconLoader";
import { vietnamesePhoneNumberRegex } from "../../constants/regex";

const Register = () => {
  useDocumentTitle("Đăng ký");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { register: registerState } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const { roles, isLoading } = useSelector((state) => state.global);

  const customerRole = roles.find((role) => role.value === "customer");

  useEffect(() => {
    if (registerState.success) {
      handleShowNotification(
        "Đăng ký thành công, Vui lòng xác nhận e-mail",
        "success",
        dispatch
      );
      dispatch(resetRegisterState({ history, email: watch("email") }));
    }
    if (registerState.error) {
      handleShowNotification(registerState.error?.msg, "error", dispatch);
    }
  }, [history, registerState, dispatch]);

  const onSubmit = (data) => {
    dispatch(
      registerUserAction({
        ...data,
        birthDate: `${data.birthYear}/${formatNumberWithZeroPrefix(
          data.birthMonth
        )}/${formatNumberWithZeroPrefix(data.birthDay)}`,
        role: customerRole._id,
      })
    );
  };

  return (
    <div className="register-wrapper">
      <div className="page-title">
        <h1>Đăng ký tài khoản</h1>
      </div>
      <Logo link="/" />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <input
            type="text"
            className="input-item"
            placeholder="Họ tên"
            maxLength={24}
            {...register("fullName", {
              required: {
                value: true,
                message: errorMessages.requiredField,
              },
            })}
          />
          {errors.fullName && (
            <div className="error-msg">{errors.fullName.message}</div>
          )}
        </div>
        <div className="input-container">
          <input
            type="text"
            className="input-item"
            placeholder="Điện thoại"
            {...register("phone", {
              required: {
                value: true,
                message: errorMessages.requiredField,
              },
              minLength: {
                value: 10,
                message: "Vui lòng nhập tối thiểu 10 số",
              },
              maxLength: {
                value: 12,
                message: "Vui lòng nhập tối đa 12 số",
              },
              pattern: {
                value: vietnamesePhoneNumberRegex,
                message: "Vui lòng nhập số điện thoại hợp lệ",
              },
            })}
          />
          {errors.phone && (
            <div className="error-msg">{errors.phone.message}</div>
          )}
        </div>
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
        <div className="input-container">
          <input
            type="password"
            className="input-item"
            placeholder="Nhập lại mật khẩu"
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
        <div className="input-container input-row__container">
          <div className="input-row__item">
            <label htmlFor="birthYear">Năm sinh</label>
            <select
              id="birthYear"
              className={`input-item select ${
                errors.birthYear ? "required" : ""
              }`}
              {...register("birthYear", {
                required: {
                  value: true,
                },
              })}
            >
              {renderOptionList(1930, new Date().getFullYear())}
            </select>
          </div>
          <div className="input-row__item">
            <label htmlFor="birthMonth">Tháng sinh</label>
            <select
              id="birthMonth"
              className={`input-item select ${
                errors.birthMonth ? "required" : ""
              }`}
              {...register("birthMonth", {
                required: {
                  value: true,
                },
              })}
            >
              {renderOptionList(1, 12)}
            </select>
          </div>
          <div className="input-row__item">
            <label htmlFor="birthDay">Ngày sinh</label>
            <select
              id="birthDay"
              className={`input-item select ${
                errors.birthDay ? "required" : ""
              }`}
              {...register("birthDay", {
                required: {
                  value: true,
                },
              })}
            >
              {renderOptionList(1, 31)}
            </select>
          </div>
        </div>
        <div>
          {(errors.birthYear || errors.birthMonth || errors.birthDay) && (
            <div className="error-msg">{errorMessages.requiredField}</div>
          )}
        </div>
        <div className="submit-btn">
          <button
            className={`form-btn ${
              registerState.isLoading || isLoading ? "divDisable" : ""
            }`}
            type="submit"
          >
            {registerState.isLoading && <IconLoader />} Đăng kí
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

export default Register;
