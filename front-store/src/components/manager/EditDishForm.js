/** @format */

import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import errorMessages from "../../constants/message";
import { generateImageUrl, validateNumber } from "../../pages/manager/NewDish";
import { editProductAction } from "../../store/actions/products";
import { resetEditProductState } from "../../store/slice/productSlice";
import {
  handleShowMultipleErrors,
  handleShowNotification,
} from "../../utils/event";
import {
  deleteFileHandler,
  fileUploadHandler,
} from "../../hooks/useFileUpload";
import IconLoader from "../ui/iconLoader";

const EditDishForm = ({ productDetail, loadingProduct, data, isLoading }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imgError, setImgError] = useState("");

  const imgRef = useRef(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [progress, setProgress] = useState(0);
  const { editProduct } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: loadingProduct ? {} : productDetail,
  });

  useEffect(() => {
    setImageUrl(generateImageUrl(imgRef.current?.files?.[0], setImgError));
    setImgError("");
  }, [imgRef]);

  useEffect(() => {
    setImageUrl(productDetail.imageUrl);
  }, [productDetail.imageUrl]);

  useEffect(() => {
    if (editProduct.success) {
      setProgress(0);
      handleShowNotification("Cập nhật món ăn thành công", "success", dispatch);
      dispatch(resetEditProductState());
    }
    if (editProduct.error?.errors) {
      handleShowMultipleErrors(editProduct.error.errors, dispatch);
      deleteFileHandler(imgRef.current?.files?.[0]);
    }
    if (editProduct.error && !editProduct.error.errors) {
      handleShowNotification(
        editProduct?.error?.msg || "Cập nhật món ăn thất bại",
        "error",
        dispatch
      );
      deleteFileHandler(imgRef.current?.files?.[0]);
    }
  }, [editProduct]);

  const onSubmit = async (submitData) => {
    if (!imgRef.current?.files?.[0]) {
      dispatch(
        editProductAction({
          ...submitData,
          imageUrl,
          _id: productDetail._id,
        })
      );
      return;
    }
    setImgError("");
    setProgress(0);
    fileUploadHandler(
      imgRef.current?.files?.[0],
      setLoadingUpload,
      setProgress,
      setImgError,
      (url) => {
        dispatch(
          editProductAction({
            ...submitData,
            imageUrl: url,
            _id: productDetail._id,
          })
        );
      }
    );
  };

  if (!productDetail) {
    return null;
  }

  return (
    <form className="form form-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="row mt-2 align-items-center">
        <div className="col-md-2">
          <strong>Tên món ăn</strong>
        </div>
        <div className="col-md-8">
          <div className="input-container">
            <input
              type="text"
              className={`input-item ${errors.title ? "required" : ""}`}
              {...register("title", {
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
              maxLength={80}
            />
            {errors.title && (
              <div className="error-msg">{errors.title.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-4 align-items-center">
        <div className="col-md-2">
          <strong>Nguyên liệu</strong>
        </div>
        <div className="col-md-8">
          <div className="input-container">
            <input
              type="text"
              className={`input-item ${errors.ingredients ? "required" : ""}`}
              maxLength={50}
              {...register("ingredients", {
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
            {errors.ingredients && (
              <div className="error-msg">{errors.ingredients.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-4 align-items-center">
        <div className="col-md-2">
          <strong>Loại</strong>
        </div>
        <div className="col-md-8">
          <div className="input-container">
            <select
              className={`input-item ${errors.category ? "required" : ""}`}
              {...register("category", {
                required: {
                  value: true,
                  message: errorMessages.requiredField,
                },
              })}
            >
              {data?.map((cate) => (
                <option value={cate._id} key={cate._id}>
                  {cate.title}
                </option>
              ))}
            </select>
            {errors.category && (
              <div className="error-msg">{errors.category.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-4 align-items-center">
        <div className="col-md-2">
          <strong>Xuất xứ</strong>
        </div>
        <div className="col-md-8">
          <div className="input-container">
            <input
              type="text"
              className={`input-item ${errors.origin ? "required" : ""}`}
              {...register("origin", {
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
              maxLength={50}
            />
            {errors.origin && (
              <div className="error-msg">{errors.origin.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-4 align-items-center">
        <div className="col-md-2">
          <strong>Giá tiền</strong>
        </div>
        <div className="col-md-8">
          <div className="input-container">
            <input
              type="number"
              min={0}
              step={1000}
              className={`input-item ${errors.price ? "required" : ""}`}
              {...register("price", {
                required: {
                  value: true,
                  message: errorMessages.requiredField,
                },
                validate: (value) => validateNumber(value),
              })}
            />
            {errors.price && (
              <div className="error-msg">{errors.price.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-4 align-items-center">
        <div className="col-md-2">
          <strong>Kalor/Set</strong>
        </div>
        <div className="col-md-8">
          <div className="input-container">
            <input
              type="number"
              min={0}
              className={`input-item ${errors.calor ? "required" : ""}`}
              {...register("calor", {
                required: {
                  value: true,
                  message: errorMessages.requiredField,
                },
                validate: (value) => validateNumber(value),
              })}
            />
            {errors.calor && (
              <div className="error-msg">{errors.calor.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-4 align-items-center">
        <div className="col-md-2">
          <strong>Ảnh</strong>
        </div>
        <div className="col-md-8">
          <div className="input-container">
            <input
              type="file"
              className={`input-item`}
              ref={imgRef}
              onChange={(e) =>
                setImageUrl(generateImageUrl(e.target.files[0], setImgError))
              }
            />
            {imgError && <div className="error-msg">{imgError}</div>}
          </div>
          {progress > 0 && (
            <div className="progress mb-2">
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{
                  width: progress + "%",
                }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          )}
          {imageUrl && (
            <div className="image-preview">
              <img src={imageUrl} alt="" />
            </div>
          )}
        </div>
      </div>
      <div className="submit-btn">
        <button
          className={`form-btn ${
            isLoading || loadingUpload || editProduct.isLoading
              ? "divDisable"
              : ""
          }`}
          type="submit"
        >
          {editProduct.isLoading && <IconLoader />} Xác nhận
        </button>
      </div>
    </form>
  );
};

EditDishForm.propTypes = {
  productDetail: PropTypes.object,
  isLoading: PropTypes.bool,
  loadingProduct: PropTypes.bool,
  data: PropTypes.array,
};

export default EditDishForm;
