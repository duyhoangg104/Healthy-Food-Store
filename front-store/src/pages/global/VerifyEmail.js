/** @format */

import React, { useState } from "react";
import "./styles/login.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Logo from "../../components/ui/logo";
import errorMessages from "../../constants/message";
import { addNoti, removeNoti } from "../../store/slice/uiSlice";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { verifyEmailRequest } from "../../store/api/users";
import IconLoader from "../../components/ui/iconLoader";

const VerifyEmail = () => {
  useDocumentTitle("Quên mật khẩu");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onValid = async (dataEmail) => {
    setIsLoading(true);
    try {
      const { data } = await verifyEmailRequest(dataEmail.email);
      const notiId = Math.random().toString();
      dispatch(
        addNoti({
          id: notiId,
          type: "success",
          msg: data.msg || "Xác nhận thành công",
        })
      );
      setTimeout(() => {
        dispatch(removeNoti(notiId));
      }, 3000);
      history.push(`/reset-password?email=${dataEmail.email}`);
    } catch (error) {
      const notiId = Math.random().toString();
      dispatch(
        addNoti({
          id: notiId,
          type: "error",
          msg: error?.response?.data?.msg || "Không thể xác nhận e-mail",
        })
      );
      setTimeout(() => {
        dispatch(removeNoti(notiId));
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="page-title">
        <h1>QUÊN MẬT KHẨU</h1>
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
        <div className="actions">
          <div className="d-flex justify-content-end">
            <p>Mã xác thực sẽ được gửi đến Email này</p>
          </div>
        </div>
        <div className="submit-btn">
          <button
            className={`form-btn ${isLoading ? "divDisable" : ""}`}
            type="submit"
          >
            {isLoading && <IconLoader />} Xác nhận
          </button>
          <p className="text-center">
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default VerifyEmail;
