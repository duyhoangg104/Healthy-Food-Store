/** @format */

import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../../../components/ui/modal";
import Backdrop from "../../../components/ui/backdrop";
import "./index.scss";
import {
  activeClassName,
  convertCouponTypeToVietnamese,
} from "../../../utils/helper";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useSelector } from "react-redux";

const CouponListModal = ({
  open,
  close,
  isLoading,
  list = [],
  onApplyCoupon,
  selectedCoupon,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [numOfCoupons, setNumOfCoupons] = useState(3);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Backdrop open={open} onClicked={close} isLoading={isLoading} />
      <Modal
        title="Healthy Food Store Khuyến Mãi"
        isLoading={isLoading}
        isOpen={open}
        close={close}
        hideSubmit
        bgColor="#CFE4C5"
      >
        <div className="coupon-list__modal">
          <h4 className="my-3">Mã giảm giá</h4>
          <div className={`coupon-list__items ${showAll ? "all" : ""}`}>
            {list.slice(0, numOfCoupons).map((item) => (
              <div className="coupon-list__item" key={item._id}>
                <strong>{item.value}</strong>
                <div>
                  <p>
                    <strong>Giảm {item.percent}%</strong>
                  </p>
                  <p>{convertCouponTypeToVietnamese(item.type)}</p>
                  <p>HSD: {new Date(item.expiredDate).toLocaleDateString()}</p>
                </div>
                <button
                  className={`btn-green ${activeClassName(
                    new Date(item.expiredDate) < new Date() ||
                      selectedCoupon?._id === item._id ||
                      item.appliedUsers.includes(userInfo?._id),
                    "divDisable"
                  )}`}
                  onClick={() => onApplyCoupon(item)}
                >
                  Áp dụng
                </button>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center align-items-center">
            {!showAll ? (
              <button
                className="btn btn-link"
                onClick={() => {
                  setShowAll(true);
                  setNumOfCoupons(list.length);
                }}
              >
                Xem thêm {"("} {list.length - numOfCoupons}
                {")"} <BsChevronDown />
              </button>
            ) : (
              <button
                className="btn btn-link"
                onClick={() => {
                  setShowAll(false);
                  setNumOfCoupons(3);
                }}
              >
                Thu gọn <BsChevronUp />
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

CouponListModal.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  isLoading: PropTypes.bool,
  list: PropTypes.array,
  onApplyCoupon: PropTypes.func,
  selectedCoupon: PropTypes.object,
};

export default CouponListModal;
