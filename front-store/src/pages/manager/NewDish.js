/** @format */

import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import errorMessages from "../../constants/message";
import { useGetCategoryListQuery } from "../../store/services/products";
import {
  fileUploadHandler,
  deleteFileHandler,
} from "../../hooks/useFileUpload";
import { createProductAction } from "../../store/actions/products";
import {
  handleShowMultipleErrors,
  handleShowNotification,
} from "../../utils/event";
import { resetCreateProductState } from "../../store/slice/productSlice";
import IconLoader from "../../components/ui/iconLoader";

export const validateNumber = (value) => {
  if (Number.isNaN(value)) {
    return "Vui lòng nhập chữ số";
  }
  return true;
};

export const generateImageUrl = (file, setError) => {
  if (file?.type !== "image/jpeg" && file?.type !== "image/png") {
    setError("Vui lòng chọn hình ảnh với định dạng png,jpg,jpeg");
    return "";
  }
  if (file) {
    return URL.createObjectURL(file);
  }
  return "";
};

const NewDish = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [imageUrl, setImageUrl] = useState("");
  const [imgError, setImgError] = useState("");
  const imgRef = useRef(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [progress, setProgress] = useState(0);
  const { createProduct } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    setImageUrl(generateImageUrl(imgRef.current?.files?.[0], setImgError));
    setImgError("");
  }, [imgRef]);

  useEffect(() => {
    if (createProduct.success) {
      reset();
      setProgress("");
      handleShowNotification("Tạo mới món ăn thành công", "success", dispatch);
      setImageUrl("");
      dispatch(resetCreateProductState());
    }
    if (createProduct.error?.errors) {
      handleShowMultipleErrors(createProduct.error.errors, dispatch);
      deleteFileHandler(imgRef.current?.files?.[0]);
    }
    if (createProduct.error && !createProduct.error.errors) {
      handleShowNotification(createProduct?.error?.msg, "error", dispatch);
      deleteFileHandler(imgRef.current?.files?.[0]);
    }
  }, [createProduct]);

  const { data, isLoading } = useGetCategoryListQuery("", {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const onSubmit = async (submitData) => {
    if (!imgRef.current?.files?.[0]) {
      setImgError("Vui lòng tải lên hình ảnh");
      return "";
    }
    setImgError("");
    setProgress(0);
    fileUploadHandler(
      imgRef.current?.files?.[0],
      setLoadingUpload,
      setProgress,
      setImgError,
      (url) => {
        const category = data?.find((item) => item._id === submitData.category);
        dispatch(
          createProductAction({
            ...submitData,
            imageUrl: url,
            status: category?.status,
          })
        );
      }
    );
  };

  return (
    <div className="new-dish my-2 w-sm-75 mx-auto">
      <div className="page-title text-left">
        <h1 className="border-bottom border-bottom-light d-inline-block">
          THÊM MÓN ĂN MỚI
        </h1>
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
                      if (
                        value?.[0] === " " ||
                        value?.[value.length - 1] === " "
                      ) {
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
                  className={`input-item ${
                    errors.ingredients ? "required" : ""
                  }`}
                  maxLength={50}
                  {...register("ingredients", {
                    required: {
                      value: true,
                      message: errorMessages.requiredField,
                    },
                    validate: (value) => {
                      if (
                        value?.[0] === " " ||
                        value?.[value.length - 1] === " "
                      ) {
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
                      if (
                        value?.[0] === " " ||
                        value?.[value.length - 1] === " "
                      ) {
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
                  max={1000}
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
                    setImageUrl(
                      generateImageUrl(e.target.files[0], setImgError)
                    )
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
                isLoading || loadingUpload || createProduct.isLoading
                  ? "divDisable"
                  : ""
              }`}
              type="submit"
            >
              {(createProduct.isLoading || loadingUpload) && <IconLoader />} Xác
              nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewDish;
