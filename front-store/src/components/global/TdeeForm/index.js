/** @format */

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import errorMessages from "../../../constants/message";
import actionIndexes from "../../../constants/tdee";
import IconLoader from "../../../components/ui/iconLoader";
import { createNewTdeeIndexAction } from "../../../store/actions/tdee";
import { setNewTdeeData } from "../../../store/slice/tdeeSlice";
import {
  handleShowMultipleErrors,
  handleShowNotification,
} from "../../../utils/event";
import "./index.scss";

const TdeeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const { createNewTdee } = useSelector((state) => state.tdee);
  const history = useHistory();

  useEffect(() => {
    if (createNewTdee.success) {
      dispatch(setNewTdeeData(createNewTdee?.data?.newTdee));
      reset();
      handleShowNotification(createNewTdee?.data?.msg, "success", dispatch);
      history.push("/ttde-calc");
    }
    if (createNewTdee.error?.errors) {
      handleShowMultipleErrors(createNewTdee.error.errors, dispatch);
    }
    if (createNewTdee.error && !createNewTdee.error.errors) {
      handleShowNotification(createNewTdee?.error?.msg, "error", dispatch);
    }
  }, [createNewTdee]);

  const onValid = (data) => {
    dispatch(createNewTdeeIndexAction(data));
  };

  return (
    <div className="tdee-form">
      <form onSubmit={handleSubmit(onValid)}>
        <div className="row mb-3 align-items-center">
          <div className="col-5">
            <strong className="text-right d-block">Giới tính</strong>
          </div>
          <div className="col-7">
            <div>
              <label className="radio-container" htmlFor="male">
                Nam
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value={"male"}
                  {...register("gender")}
                />
                <span className="checkmark" />
              </label>
              <label className="radio-container" htmlFor="female">
                Nữ
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value={"female"}
                  {...register("gender")}
                />
                <span className="checkmark" />
              </label>
            </div>
            {errors.gender && (
              <div className="error-msg">{errors.gender.message}</div>
            )}
          </div>
        </div>
        <div className="row mb-3 align-items-center">
          <div className="col-5">
            <strong className="text-right d-block">Tuổi</strong>
          </div>
          <div className="col-7">
            <input
              className="form-input"
              type="number"
              min={1}
              {...register("age", {
                required: {
                  value: true,
                  message: errorMessages.requiredField,
                },
                max: {
                  value: 100,
                  message: "Vui lòng nhập độ tuổi dưới 100",
                },
              })}
            />
            {errors.age && (
              <div className="error-msg">{errors.age.message}</div>
            )}
          </div>
        </div>
        <div className="row mb-3 align-items-center">
          <div className="col-5">
            <strong className="text-right d-block">Cân nặng</strong>
          </div>
          <div className="col-7">
            <input
              className="form-input"
              type="number"
              min={20}
              {...register("weight", {
                required: {
                  value: true,
                  message: errorMessages.requiredField,
                },
                max: {
                  value: 200,
                  message: "Vui lòng nhập cân nặng dưới 200kg",
                },
              })}
            />
            {errors.weight && (
              <div className="error-msg">{errors.weight.message}</div>
            )}
          </div>
        </div>
        <div className="row mb-3 align-items-center">
          <div className="col-5">
            <strong className="text-right d-block">Chiều cao</strong>
          </div>
          <div className="col-7 height__selector">
            <input
              className="form-input"
              type="number"
              min={50}
              {...register("height", {
                required: {
                  value: true,
                  message: errorMessages.requiredField,
                },
                max: {
                  value: 250,
                  message: "Vui lòng nhập chiều cao dưới 250cm",
                },
              })}
            />
            {errors.height && (
              <div className="error-msg">{errors.height.message}</div>
            )}
          </div>
        </div>
        <div className="row mb-3 align-items-center">
          <div className="col-5">
            <strong className="text-right d-block">
              Mức độ vận động trong ngày
            </strong>
          </div>
          <div className="col-7">
            <select
              className="form-input"
              {...register("actionIndex", {
                required: {
                  value: true,
                  message: errorMessages.requiredField,
                },
              })}
            >
              {actionIndexes.map((actionIndex) => (
                <option value={actionIndex.value} key={actionIndex.id}>
                  {actionIndex.text}
                </option>
              ))}
            </select>
            {errors.actionIndex && (
              <div className="error-msg">{errors.actionIndex.message}</div>
            )}
          </div>
        </div>
        <div className="row mb-3 align-items-center">
          <div className="col-5">
            <strong className="text-right d-block text-muted">
              Tỉ lệ mỡ % <br />
              (không bắt buộc)
            </strong>
          </div>
          <div className="col-7">
            <input
              className="form-input"
              type="number"
              min={0}
              max={100}
              {...register("bodyFat")}
            />
          </div>
        </div>
        <div className="actions my-5">
          <button
            type="submit"
            className={`btn-green ${
              createNewTdee.isLoading ? "divDisable divDisableWhite" : ""
            }`}
          >
            {createNewTdee.isLoading && <IconLoader />} Tính
          </button>
        </div>
      </form>
    </div>
  );
};

export default TdeeForm;
