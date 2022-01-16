import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import errorMessages from "../../constants/message";
import "./index.scss";
import Loader from "../../components/ui/loader";
import { activeClassName } from "../../utils/helper";
import { updateMyInfoAction } from "../../store/actions/users";
import {
  handleShowMultipleErrors,
  handleShowNotification,
} from "../../utils/event";
import { resetUpdateMyInfoState } from "../../store/slice/authSlice";
import { dateRegex, vietnamesePhoneNumberRegex } from "../../constants/regex";
import IconLoader from "../../components/ui/iconLoader";

const CustomerProfile = () => {
  const { userInfo, updateInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [editting, setEditting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      fullName: userInfo?.fullName,
      phone: userInfo?.phone,
      birthDate: userInfo?.birthDate?.substr(0, 10),
      address: userInfo?.address || "",
    },
  });

  useEffect(() => {
    if (userInfo?._id) {
      setValue("fullName", userInfo.fullName);
      setValue("phone", userInfo.phone);
      setValue("birthDate", userInfo.birthDate.substr(0, 10));
      setValue("address", userInfo.address);
    }
  }, [userInfo]);

  useEffect(() => {
    if (updateInfo.success) {
      setEditting(false);
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

  const onValid = (data) => {
    dispatch(updateMyInfoAction(data));
  };

  if (!userInfo?._id) {
    return <Loader />;
  }

  return (
    <div className="customer-profile">
      <div className="container">
        {editting ? (
          <div>
            <form onSubmit={handleSubmit(onValid)}>
              <div className="profile-wrapper">
                <div className="row">
                  <div className="col-5 col-md-3 border-right-green">
                    <div>
                      <p className="text-green-sm mt-3">Tên người dùng</p>
                      {errors.fullName && (
                        <div className="error-msg invisible h-25-6">
                          {errors.fullName.message}
                        </div>
                      )}
                    </div>
                    <p className="text-green-sm mt-4">Email</p>
                    <div>
                      <p className="text-green-sm mt-4">Số điện thoại</p>
                      {errors.phone && (
                        <div className="error-msg invisible h-25-6">
                          {errors.phone.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-green-sm mt-4">Ngày sinh</p>
                      {errors.birthDate && (
                        <div className="error-msg invisible h-25-6">
                          {errors.birthDate.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-green-sm mt-4">Địa chỉ</p>
                      {errors.address && (
                        <div className="error-msg invisible h-25-6">
                          {errors.address.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-7 col-md-9">
                    <div className="input-container mt-3 mb-2">
                      <input
                        type="text"
                        className="input-item"
                        maxLength={24}
                        {...register("fullName", {
                          required: {
                            value: true,
                            message: errorMessages.requiredField,
                          },
                        })}
                      />
                      {errors.fullName && (
                        <div className="error-msg">
                          {errors.fullName.message}
                        </div>
                      )}
                    </div>
                    <p className="email">{userInfo?.email}</p>
                    <div className="input-container mt-2 mb-3">
                      <input
                        type="text"
                        className="input-item"
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
                            value: 10,
                            message: "Vui lòng nhập tối đa 10 số",
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
                    <div className="input-container mb-3">
                      <input
                        type="text"
                        className="input-item"
                        maxLength={24}
                        {...register("birthDate", {
                          required: {
                            value: true,
                            message: errorMessages.requiredField,
                          },
                          pattern: {
                            value: dateRegex,
                            message:
                              "Vui lòng nhập ngày sinh đúng định dạng yyyy-mm-dd",
                          },
                        })}
                      />
                      {errors.birthDate && (
                        <div className="error-msg">
                          {errors.birthDate.message}
                        </div>
                      )}
                    </div>
                    <div className="input-container mb-2">
                      <input
                        type="text"
                        className="input-item"
                        {...register("address", {
                          required: {
                            value: true,
                            message: errorMessages.requiredField,
                          },
                        })}
                      />
                      {errors.address && (
                        <div className="error-msg">
                          {errors.address.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <button
                  type="submit"
                  className={`btn-green sm ${activeClassName(
                    updateInfo.isLoading,
                    "divDisable"
                  )}`}
                >
                  {updateInfo.isLoading && <IconLoader />} Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="profile-wrapper">
            <div className="row">
              <div className="col-5 col-md-3 border-right-green">
                <p className="text-green-sm mt-3">Tên người dùng</p>
                <p className="text-green-sm">Email</p>
                <p className="text-green-sm">Số điện thoại</p>
                <p className="text-green-sm">Ngày sinh</p>
                <p className="text-green-sm">Địa chỉ</p>
              </div>
              <div className="col-7 col-md-9">
                <p className="mt-3">{userInfo?.fullName}</p>
                <p>{userInfo?.email}</p>
                <p>{userInfo?.phone}</p>
                <p>{userInfo?.birthDate?.substr(0, 10)}</p>
                <p>{userInfo?.address || "Chưa có địa chỉ"}</p>
              </div>
            </div>
            <button
              className="btn-green sm btn-edit"
              onClick={() => setEditting(true)}
            >
              Cập nhật
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerProfile;
