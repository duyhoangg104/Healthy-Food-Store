/** @format */

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import errorMessages from "../../../constants/message";
import { updateMyInfoAction } from "../../../store/actions/users";
import { resetUpdateMyInfoState } from "../../../store/slice/authSlice";
import {
  convertDateToSeperatedField,
  formatNumberWithZeroPrefix,
  renderOptionList,
} from "../../../utils/helper";
import {
  handleShowMultipleErrors,
  handleShowNotification,
} from "../../../utils/event";
import Loader from "../../../components/ui/loader";
import { vietnamesePhoneNumberRegex } from "../../../constants/regex";
import IconLoader from "../../../components/ui/iconLoader";

const EditInfo = () => {
  const { userInfo, updateInfo } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const [birthYear, birthMonth, birthDay] = convertDateToSeperatedField(
    userInfo?.birthDate?.substr(0, 10)
  );

  useEffect(() => {
    if (updateInfo.success) {
      handleShowNotification(
        "Cập nhật thông tin thành công",
        "success",
        dispatch
      );
      dispatch(resetUpdateMyInfoState());
    }
    if (updateInfo.error?.errors) {
      handleShowMultipleErrors(updateInfo.error.errors, dispatch);
    }
    if (updateInfo.error && !updateInfo.error.errors) {
      handleShowNotification(
        updateInfo?.error?.msg || "Cập nhật thông tin thất bại",
        "error",
        dispatch
      );
    }
  }, [updateInfo, dispatch]);

  const onSubmit = (data) => {
    dispatch(
      updateMyInfoAction({
        ...data,
        birthDate: `${data.birthYear}/${formatNumberWithZeroPrefix(
          data.birthMonth
        )}/${formatNumberWithZeroPrefix(data.birthDay)}`,
      })
    );
  };

  if (!userInfo._id) {
    return <Loader />;
  }

  return (
    <div>
      <div className="edit-info my-2 w-sm-75 mx-auto">
        <form className="form form-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="row mt-2 align-items-center">
            <div className="col-md-2">
              <strong>Họ Tên</strong>
            </div>
            <div className="col-md-8">
              <div className="input-container">
                <input
                  type="text"
                  className={`input-item ${errors.fullName ? "required" : ""}`}
                  placeholder="Họ tên"
                  maxLength={24}
                  defaultValue={userInfo?.fullName}
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
            </div>
          </div>
          <div className="row mt-4 align-items-center">
            <div className="col-md-2">
              <strong>Email</strong>
            </div>
            <div className="col-md-8">
              <div className="input-container">
                <input
                  type="email"
                  className={`input-item divDisable ${
                    errors.email ? "required" : ""
                  }`}
                  placeholder="Email"
                  maxLength={50}
                  defaultValue={userInfo?.email}
                  {...register("email", {
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
            </div>
          </div>
          <div className="row mt-4 align-items-center">
            <div className="col-md-2">
              <strong>Số điện thoại</strong>
            </div>
            <div className="col-md-8">
              <div className="input-container">
                <input
                  type="text"
                  className={`input-item ${errors.phone ? "required" : ""}`}
                  placeholder="Điện thoại"
                  defaultValue={userInfo?.phone}
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
            </div>
          </div>
          <div className="row mt-4 align-items-center">
            <div className="col-md-2">
              <strong>Ngày Sinh</strong>
            </div>
            <div className="col-md-8">
              <div className="input-container input-row__container">
                <div className="input-row__item">
                  <label htmlFor="birthYear">Năm</label>
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
                  <label htmlFor="birthMonth">Tháng</label>
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
                  <label htmlFor="birthDay">Ngày</label>
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
            </div>
          </div>
          <div className="row mt-4 align-items-center">
            <div className="col-md-2">
              <strong>Giới tính</strong>
            </div>
            <div className="col-md-8">
              <div className="input-container">
                <div className="input-row__item w-50">
                  <label htmlFor="gender">Giới tính</label>
                  <select
                    id="gender"
                    defaultValue={userInfo?.gender}
                    className={`input-item select ${
                      errors.gender ? "required" : ""
                    }`}
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
            </div>
          </div>
          <div className="submit-btn">
            <button
              className={`form-btn ${updateInfo.isLoading ? "divDisable" : ""}`}
              type="submit"
            >
              {updateInfo.isLoading && <IconLoader />} Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInfo;
