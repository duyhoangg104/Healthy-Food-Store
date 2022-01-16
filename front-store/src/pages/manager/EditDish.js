/** @format */

import React from "react";
import "./index.scss";
import {
  useGetCategoryListQuery,
  useGetProductDetailQuery,
} from "../../store/services/products";
import Loader from "../../components/ui/loader";
import { useParams } from "react-router";
import EditDishForm from "../../components/manager/EditDishForm";

const EditDish = () => {
  const { id } = useParams();
  const { data: productDetail, isLoading: loadingProduct } =
    useGetProductDetailQuery(id, {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    });

  const { data, isLoading } = useGetCategoryListQuery("", {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  if (loadingProduct || isLoading) {
    return <Loader />;
  }

  if (!productDetail || !data) {
    return null;
  }

  return (
    <div className="new-dish my-2 w-sm-75 mx-auto">
      <div className="page-title text-left">
        <h1 className="border-bottom border-bottom-light d-inline-block pb-1">
          CẬP NHẬT THÔNG TIN SẢN PHẨM
        </h1>
        <EditDishForm
          productDetail={productDetail}
          loadingProduct={loadingProduct || isLoading}
          data={data}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default EditDish;
