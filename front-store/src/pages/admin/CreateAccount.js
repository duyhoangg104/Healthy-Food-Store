/** @format */

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconLoader from "../../components/ui/iconLoader";
import errorMessages from "../../constants/message";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import {
  convertRoleToVietnamese,
  formatNumberWithZeroPrefix,
  renderOptionList,
} from "../../utils/helper";
import { createUserAction } from "../../store/actions/admin";
import { addNewUserToState } from "../../store/slice/adminSlice";
import {
  handleShowNotification,
  handleShowMultipleErrors,
} from "../../utils/event";
import { vietnamesePhoneNumberRegex } from "../../constants/regex";

const CreateAccount = () => {
  useDocumentTitle("Tạo mới tài khoản");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const { createUser: createUserState } = useSelector((state) => state.admin);
  const { roles } = useSelector((state) => state.global);

  useEffect(() => {
    if (createUserState.success) {
      reset();
      handleShowNotification(
        createUserState.data?.msg || "Tạo mới tài khoản thành công",
        "success",
        dispatch
      );
      dispatch(addNewUserToState(createUserState.data?.user));
    }
    if (createUserState.error?.msg) {
      handleShowNotification(createUserState.error?.msg, "error", dispatch);
    }
    if (createUserState.error?.errors) {
      handleShowMultipleErrors(createUserState.error?.errors, dispatch);
    }
  }, [createUserState, dispatch, reset]);

  const onSubmit = (data) => {
    dispatch(
      createUserAction({
        ...data,
        birthDate: `${data.birthYear}/${formatNumberWithZeroPrefix(
          data.birthMonth
        )}/${formatNumberWithZeroPrefix(data.birthDay)}`,
      })
    );
  };

  return (
    <div className="create-account">
      <div className="page-title">
        <h1>Tạo mới tài khoản</h1>
      </div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <input
            type="text"
            className={`input-item ${errors.fullName ? "required" : ""}`}
            placeholder="Họ tên"
            maxLength={24}
            {...register("fullName", {
              required: {
                value: true,
                message: errorMessages.requiredField,
              },
              validate: (value) => {
                if (value?.[0] === " " || value?.[value.length - 1] === " ") {
                  return "Vui lòng loại bỏ khoảng trắng";
                }
                return true;
              },
            })}
          />
          {errors.fullName && (
            <div className="error-msg">{errors.fullName.message}</div>
          )}
        </div>
        <div className="input-container">
          <input
            type="email"
            className={`input-item ${errors.fullName ? "required" : ""}`}
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
            autoComplete="off"
          />
          {errors.email && (
            <div className="error-msg">{errors.email.message}</div>
          )}
        </div>
        <div className="input-container">
          <input
            type="password"
            className={`input-item ${errors.fullName ? "required" : ""}`}
            placeholder="Mật khẩu"
            autoComplete="off"
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
            type="text"
            className={`input-item ${errors.fullName ? "required" : ""}`}
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
              validate: (value) => {
                if (value?.[0] === " " || value?.[value.length - 1] === " ") {
                  return "Vui lòng loại bỏ khoảng trắng";
                }
                return true;
              },
            })}
          />
          {errors.phone && (
            <div className="error-msg">{errors.phone.message}</div>
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
        <div className="input-container">
          <div className="input-row__item w-50">
            <label htmlFor="gender">Giới tính</label>
            <select
              id="gender"
              className={`input-item select ${errors.gender ? "required" : ""}`}
              {...register("gender", {
                required: {
                  value: true,
                },
              })}
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
          {errors.gender && (
            <div className="error-msg">{errors.gender.message}</div>
          )}
        </div>
        <div className="input-container">
          <div className="input-row__item w-50">
            <label htmlFor="role">Vai trò</label>
            <select
              id="role"
              className={`input-item text-capitalize select ${
                errors.role ? "required" : ""
              }`}
              {...register("role", {
                required: {
                  value: true,
                  message: errorMessages.requiredField,
                },
              })}
            >
              {roles
                .filter((item) => item.value !== "customer")
                .map((role) => (
                  <option
                    value={role._id}
                    key={role._id}
                    className="text-capitalize"
                  >
                    {convertRoleToVietnamese(role.value)}
                  </option>
                ))}
            </select>
          </div>
          {errors.role && (
            <div className="error-msg">{errors.role.message}</div>
          )}
        </div>

        <div className="submit-btn">
          <button
            className={`form-btn ${
              createUserState.isLoading ? "divDisable" : ""
            }`}
            type="submit"
          >
            {createUserState.isLoading && <IconLoader />} Xác nhận
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
