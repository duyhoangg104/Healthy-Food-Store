/** @format */

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import errorMessages from "../../constants/message";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import {
  convertDateToSeperatedField,
  convertRoleToVietnamese,
  formatNumberWithZeroPrefix,
  renderOptionList,
} from "../../utils/helper";
import { updateUserInfoInState } from "../../store/slice/adminSlice";
import { editUserInfoAction } from "../../store/actions/admin";
import { useGetSingleUserInfoDataQuery } from "../../store/services/users";
import { useParams } from "react-router-dom";
import Loader from "../../components/ui/loader";
import { vietnamesePhoneNumberRegex } from "../../constants/regex";
import {
  handleShowNotification,
  handleShowMultipleErrors,
} from "../../utils/event";
import IconLoader from "../../components/ui/iconLoader";

const EditUserInfo = () => {
  useDocumentTitle("Thay đổi thông tin người dùng");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { editUserInfo } = useSelector((state) => state.admin);
  const { id } = useParams();
  const { roles } = useSelector((state) => state.global);

  const { data, isLoading, error, refetch } = useGetSingleUserInfoDataQuery(
    id,
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  useEffect(() => {
    if (editUserInfo.success) {
      handleShowNotification(editUserInfo.data?.msg, "success", dispatch);
      dispatch(updateUserInfoInState(editUserInfo.data?.user));
      refetch();
    }
    if (editUserInfo.error?.msg) {
      handleShowNotification(editUserInfo.error?.msg, "error", dispatch);
    }
    if (editUserInfo.error?.errors) {
      handleShowMultipleErrors(editUserInfo.error?.errors, dispatch);
    }
  }, [editUserInfo, dispatch]);

  const onSubmit = (dataInput) => {
    dispatch(
      editUserInfoAction({
        ...dataInput,
        birthDate: `${dataInput.birthYear}/${formatNumberWithZeroPrefix(
          dataInput.birthMonth
        )}/${formatNumberWithZeroPrefix(dataInput.birthDay)}`,
        id,
      })
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="create-account">
        <p className="text-danger text-center font-weight-bold">
          {error?.data?.msg}
        </p>
      </div>
    );
  }

  const [birthYear, birthMonth, birthDay] = convertDateToSeperatedField(
    data?.birthDate?.substr(0, 10)
  );

  return (
    <div className="create-account">
      <div className="page-title">
        <h1>Thay đổi thông tin</h1>
      </div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <input
            type="text"
            className={`input-item ${errors.fullName ? "required" : ""}`}
            placeholder="Họ tên"
            defaultValue={data?.fullName}
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
          <span
            className={`input-item divDisable ${
              errors.email ? "required" : ""
            }`}
          >
            {data?.email}
          </span>
        </div>
        <div className="input-container">
          <input
            type="password"
            className={`input-item ${errors.password ? "required" : ""}`}
            placeholder="Mật khẩu"
            autoComplete="false"
            defaultValue=""
            maxLength={32}
            {...register("password", {
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
            className={`input-item ${errors.phone ? "required" : ""}`}
            placeholder="Điện thoại"
            defaultValue={data?.phone}
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
              defaultValue={birthYear}
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
              defaultValue={birthMonth}
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
              defaultValue={birthDay}
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
              defaultValue={data?.gender}
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
              defaultValue={data?.role}
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
            className={`form-btn ${editUserInfo.isLoading ? "divDisable" : ""}`}
            type="submit"
          >
            {editUserInfo.isLoading && <IconLoader />} Xác nhận
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserInfo;
