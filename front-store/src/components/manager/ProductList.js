/** @format */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./index.scss";
import Loader from "../ui/loader";
import { DeleteSvgIcon, EditSvgIcon } from "../../constants/icons";
import { formatter } from "../../utils/helper";
import { useHistory } from "react-router-dom";
import DeleteProductModal from "./DeleteProductModal";
import {
  deleteProductRequest,
  toggleProductStatusRequest,
} from "../../store/api";
import ToggleProductStatus from "./ToggleProductStatus";
import { MAX_ITEMS } from "../../pages/manager/Products";
import { handleShowNotification } from "../../utils/event";
import { useDispatch } from "react-redux";

const ProductList = ({
  data,
  isLoading,
  categoryList,
  currentPage,
  setRootDataList,
  fetchNewestData,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(false);
  const [product, setProduct] = useState({});
  const [processing, setProcessing] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    if (data?.length) {
      setDataList(data);
    }
  }, [data]);

  const onClose = () => {
    setDeleting(false);
    setProduct({});
  };

  const deleteProductHandler = async () => {
    setProcessing(true);
    try {
      const { data: dataDelete } = await deleteProductRequest(product._id);
      onClose();
      setDataList((prevState) =>
        prevState.filter((item) => item._id !== dataDelete.deletedProductId)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  const toggleProductStatusHandler = async (productId, status) => {
    setSelectedId(productId);
    setToggling(true);
    try {
      const { data: dataDelete } = await toggleProductStatusRequest(
        productId,
        status
      );
      handleShowNotification(dataDelete.msg, "success", dispatch);
      setRootDataList((prevState) =>
        prevState.filter((item) =>
          item._id === dataDelete.deactivatedProductId
            ? {
                ...item,
                isActivated: !item.isActivated,
              }
            : item
        )
      );
      fetchNewestData();
    } catch (error) {
      console.log(error);
    } finally {
      setToggling(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="data-list table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên món</th>
            <th>Nguyên liệu</th>
            <th>Loại SP</th>
            <th>Xuất xứ</th>
            <th>Giá(VNĐ/set)</th>
            <th>Trạng thái</th>
            <th>
              <div className="text-center">Sửa/ Xóa</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {dataList?.map((item, index) => (
            <tr key={item._id}>
              <td> {currentPage * MAX_ITEMS + (index + 1)} </td>
              <td>
                {item.title.substr(0, 30)}{" "}
                {item.title?.length > 30 ? "..." : ""}
              </td>
              <td>{item.ingredients}</td>
              <td>
                {categoryList.find((cate) => cate._id === item.category)?.title}
              </td>
              <td>{item.origin}</td>
              <td>{formatter.format(item.price)}</td>
              <td>
                <ToggleProductStatus
                  isActive={item.isActivated}
                  item={item}
                  onToggle={() =>
                    toggleProductStatusHandler(item._id, !item.isActivated)
                  }
                  selectedId={selectedId}
                  toggling={toggling}
                />
              </td>
              <td>
                <div className="actions">
                  <button
                    className="me-3"
                    onClick={() =>
                      history.push(`/manager/edit-product/${item._id}`)
                    }
                  >
                    <EditSvgIcon />
                  </button>
                  <button
                    className="delete"
                    onClick={() => {
                      setProduct(item);
                      setDeleting(true);
                    }}
                  >
                    <DeleteSvgIcon fill="#ed4337" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteProductModal
        open={deleting}
        close={onClose}
        product={product}
        onDeleteProduct={deleteProductHandler}
        isLoading={processing}
      />
    </div>
  );
};

ProductList.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  categoryList: PropTypes.array,
  currentPage: PropTypes.number,
  setRootDataList: PropTypes.func,
  fetchNewestData: PropTypes.func,
};

export default ProductList;
