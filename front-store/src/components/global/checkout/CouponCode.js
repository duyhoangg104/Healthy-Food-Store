import React, { useState } from "react";
import PropTypes from "prop-types";
import "./index.scss";
import { useDispatch } from "react-redux";
import { setCoupon } from "../../../store/slice/cartSlice";
import CouponListModal from "./CouponList";
import {
  activeClassName,
  convertCouponTypeToVietnamese,
} from "../../../utils/helper";

const CouponCode = ({
  listCoupon,
  isLoading,
  isFetching,
  refetch,
  setSelectedCoupon,
  selectedCoupon,
}) => {
  const [openCouponList, setOpenCouponList] = useState(false);
  const dispatch = useDispatch();

  const onOpenCouponList = () => {
    refetch();
    setOpenCouponList(true);
  };

  const onCloseCouponList = () => {
    refetch();
    setOpenCouponList(false);
  };

  const onApplyCoupon = (coupon) => {
    dispatch(setCoupon(coupon.value));
    setSelectedCoupon(coupon);
    refetch();
    setOpenCouponList(false);
  };

  return (
    <div className="delivery-address border-green rounded-10 shadow mb-4">
      <div className="address-header">
        <div className="d-flex align-items-center justify-content-between p-2 border-bottom px-3">
          <p className="mb-0">HFS khuyến mãi</p>
          <p className="mb-0">Có thể chọn 1</p>
        </div>
      </div>
      <div className="p-2 px-3">
        <div>
          {selectedCoupon && (
            <div className="coupon-box">
              {selectedCoupon.value} -{" "}
              {convertCouponTypeToVietnamese(selectedCoupon.type)}{" "}
              {selectedCoupon.percent}%
            </div>
          )}
          <button
            type="button"
            className={`btn btn-link text-center w-100 ${activeClassName(
              isLoading,
              "divDisable divDisableWhite"
            )}`}
            onClick={onOpenCouponList}
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_829:1024)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.3366 5.10618L12.4739 7.96631C12.2428 8.19756 11.9294 8.32782 11.6024 8.32858H7.09818C5.01578 8.32858 3.32858 10.0158 3.32858 12.0982V16.6024C3.32858 16.9318 3.19685 17.2434 2.96631 17.4764L0.103647 20.3366C-0.603019 21.0435 -1 22.0021 -1 23.0016C-1 24.0012 -0.603019 24.9598 0.103647 25.6667L2.96631 28.5294C3.19756 28.7605 3.32782 29.0739 3.32858 29.4008V33.9051C3.32858 35.9875 5.01578 37.6747 7.09818 37.6747H11.6024C11.9318 37.6747 12.2434 37.8064 12.4764 38.037L15.3366 40.8996C16.0435 41.6063 17.0021 42.0033 18.0016 42.0033C19.0012 42.0033 19.9598 41.6063 20.6667 40.8996L23.5294 38.037C23.7605 37.8057 24.0739 37.6755 24.4008 37.6747H28.9051C30.9875 37.6747 32.6747 35.9875 32.6747 33.9051V29.4008C32.6747 29.0715 32.8064 28.7599 33.037 28.5268L35.8996 25.6667C36.6063 24.9598 37.0033 24.0012 37.0033 23.0016C37.0033 22.0021 36.6063 21.0435 35.8996 20.3366L33.037 17.4739C32.8057 17.2428 32.6755 16.9294 32.6747 16.6024V12.0982C32.6747 10.0158 30.9875 8.32858 28.9051 8.32858H24.4008C24.073 8.32849 23.7586 8.19818 23.5268 7.96631L20.6667 5.10365C19.9598 4.39698 19.0012 4 18.0016 4C17.0021 4 16.0435 4.39698 15.3366 5.10365V5.10618ZM10.7715 28.4382L23.4382 15.7715L25.2318 17.5651L12.5651 30.2318L10.7715 28.4382ZM11.6683 16.6683V19.2016H14.2016V16.6683H11.6683ZM21.8016 29.335H24.335V26.8016H21.8016V29.335Z"
                  fill="#4F89C9"
                />
              </g>
              <defs>
                <clipPath id="clip0_829:1024">
                  <rect width="38" height="38" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="ms-2 coupon-text">Chọn mã khuyến mãi</span>
          </button>
        </div>
      </div>
      <CouponListModal
        open={openCouponList}
        close={onCloseCouponList}
        isLoading={isLoading || isFetching}
        list={listCoupon}
        onApplyCoupon={onApplyCoupon}
        selectedCoupon={selectedCoupon}
      />
    </div>
  );
};

CouponCode.propTypes = {
  listCoupon: PropTypes.array,
  isLoading: PropTypes.bool,
  isFetching: PropTypes.bool,
  refetch: PropTypes.func,
  setSelectedCoupon: PropTypes.func,
  selectedCoupon: PropTypes.object,
};

export default CouponCode;
