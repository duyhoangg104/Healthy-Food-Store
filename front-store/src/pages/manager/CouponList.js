import React, { useEffect, useState } from "react";
import { BsFolderPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  createCouponRequest,
  toggleCouponActivatedStatusRequest,
} from "../../store/api";
import { handleShowNotification } from "../../utils/event";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { activeClassName } from "../../utils/helper";
import CouponDataList from "../../components/manager/CouponDataList";
import { useGetCouponListQuery } from "../../store/services/coupons";
import CouponFormModal from "../../components/manager/CouponForm";

export const MAX_ITEMS = 10;

const CouponList = () => {
  useDocumentTitle("Danh sách mã giảm giá");
  const { data, isLoading, refetch } = useGetCouponListQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [dataList, setDataList] = useState([]);
  const [openCouponForm, setOpenCouponForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.length) {
      setDataList(data);
    }
  }, [data]);

  const onOpen = () => setOpenCouponForm(true);

  const onClose = () => {
    if (selectedCoupon) {
      setSelectedCoupon(null);
    }
    setOpenCouponForm(false);
  };

  const onEditHandler = (couponItem) => {
    setSelectedCoupon(couponItem);
    setOpenCouponForm(true);
  };

  const submitFormCouponHandler = async (couponData, reset) => {
    setIsCreating(true);
    try {
      const { data } = await createCouponRequest(couponData);
      refetch();
      reset();
      onClose();
      handleShowNotification(data.msg, "success", dispatch);
      if (data.updatedCoupon) {
        setDataList((prevState) =>
          prevState.map((item) =>
            item._id === data.updatedCoupon._id ? data.updatedCoupon : item
          )
        );
        return;
      }
      setDataList((prevState) => [...prevState, data.newCoupon]);
    } catch (error) {
      handleShowNotification(
        error?.response?.data?.msg || "Tạo mới loại sản phẩm thất bại",
        "error",
        dispatch
      );
    } finally {
      setIsCreating(false);
    }
  };

  const toggleCouponActivatedStatusHandler = async (couponId, status) => {
    setToggling(true);
    try {
      const { data } = await toggleCouponActivatedStatusRequest(
        couponId,
        status
      );
      handleShowNotification(data?.msg, "success", dispatch);
      setDataList((prevState) =>
        prevState.map((item) =>
          item._id === couponId ? { ...item, isActivated: status } : item
        )
      );
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setToggling(false);
    }
  };

  return (
    <div
      className={`${activeClassName(toggling, "divDisable divDisableWhite")}`}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Quản lý mã giảm giá</h3>
        <button className="btn-green" onClick={onOpen}>
          <BsFolderPlus /> Thêm mã
        </button>
      </div>
      <CouponDataList
        data={dataList}
        isLoading={isLoading}
        onTogglerStatus={toggleCouponActivatedStatusHandler}
        onEditHandler={onEditHandler}
      />
      <CouponFormModal
        open={openCouponForm}
        close={onClose}
        onSubmitCouponForm={submitFormCouponHandler}
        isLoading={isCreating}
        selectedCoupon={selectedCoupon}
      />
    </div>
  );
};

export default CouponList;
