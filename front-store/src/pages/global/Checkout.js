import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CouponCode from "../../components/global/checkout/CouponCode";
import DeliveryAddress from "../../components/global/checkout/DeliveryAddress";
import DeliveryMethod from "../../components/global/checkout/DeliveryMethod";
import OrderProductList from "../../components/global/checkout/OrderProductList";
import PaymentMethod from "../../components/global/checkout/PaymentMethod";
import Summary from "../../components/global/checkout/Summary";
import useScrollTop from "../../hooks/useScrollTop";
import { createOrderAction } from "../../store/actions/orders";
import {
  endPaypalPaymentGateway,
  resetCart,
  resetCheckoutState,
  startPaypalPaymentGateway,
} from "../../store/slice/cartSlice";
import { activeClassName } from "../../utils/helper";
import {
  handleShowNotification,
  handleShowMultipleErrors,
} from "../../utils/event";
import errorMessages from "../../constants/message";
import { useGetCouponListQuery } from "../../store/services/coupons";
import { applyCouponRequest, createOrderPaymentRequest } from "../../store/api";

const Checkout = () => {
  useScrollTop();
  const { list, total, coupon, checkout } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [deliveryMethod, setDeliveryMethod] = useState("ship");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { data, isLoading, isFetching, refetch } = useGetCouponListQuery(null, {
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (!list?.length) {
      history.push("/menu");
    }
  }, [list]);

  useEffect(() => {
    if (checkout.success) {
      if (selectedCoupon) {
        applyCouponRequest(selectedCoupon._id, checkout.data.newOrder._id);
      }
      if (checkout.data.newOrder.paymentMethod === "paypal") {
        handleCreatePayment(checkout.data.newOrder._id);
        return;
      }
      handleShowNotification(checkout.data.msg, "success", dispatch);
      dispatch(resetCheckoutState());
      dispatch(resetCart());
      history.push("/customer-profile/orders");
    }
    if (checkout.error?.errors) {
      handleShowMultipleErrors(checkout.error.errors, dispatch);
    }
    if (checkout.error && !checkout.error.errors) {
      handleShowNotification(checkout?.error?.msg, "error", dispatch);
      if (checkout.error?.msg === errorMessages.unAuth) {
        dispatch(resetCheckoutState());
        dispatch(resetCart());
        history.push("/login");
      }
    }
  }, [checkout]);

  const shipAmount = deliveryMethod === "ship" ? 30000 : 0;

  const couponAmount = selectedCoupon
    ? selectedCoupon.percent *
      0.01 *
      (selectedCoupon.type === "order" ? total : shipAmount)
    : 0;

  async function handleCreatePayment(orderId) {
    dispatch(startPaypalPaymentGateway());
    try {
      const { data } = await createOrderPaymentRequest({ orderId });
      dispatch(resetCheckoutState());
      dispatch(resetCart());
      window.location.assign(data.redirectUrl);
    } catch (error) {
      handleShowNotification(
        error?.response?.data?.msg || error?.message,
        "error",
        dispatch
      );
    } finally {
      dispatch(endPaypalPaymentGateway());
    }
  }

  const onValid = () => {
    dispatch(
      createOrderAction({
        deliveryMethod,
        paymentMethod,
        coupon,
        products: list.map((item) => ({
          productId: item._id,
          imageUrl: item.imageUrl,
          title: item.title,
          qty: item.qty,
          price: item.price,
        })),
        total: total + shipAmount - couponAmount,
        deliveryAddress: {
          name: userInfo.fullName,
          address: userInfo.address,
          phone: userInfo.phone,
        },
      })
    );
  };

  return (
    <div className="checkout-wrapper px-4 my-5">
      <h3 className="mb-3">1. Chọn hình thức giao hàng</h3>
      <div>
        <div className="row">
          <div className="col-lg-7">
            <div className="products border-green p-4 rounded-10 shadow mb-4">
              <DeliveryMethod
                deliveryMethod={deliveryMethod}
                setDeliveryMethod={setDeliveryMethod}
              />
              <OrderProductList list={list} total={total} />
            </div>
          </div>
          <div className="col-lg-5">
            <DeliveryAddress userInfo={userInfo} />
            <CouponCode
              coupon={coupon}
              setSelectedCoupon={setSelectedCoupon}
              listCoupon={data}
              isLoading={isLoading}
              isFetching={isFetching}
              refetch={refetch}
              selectedCoupon={selectedCoupon}
            />
            <Summary
              total={total}
              shipAmount={shipAmount}
              couponAmount={couponAmount}
              selectedCoupon={selectedCoupon}
            />
          </div>
        </div>
        <h3 className="mb-3 mt-3">2. Chọn phương thức thanh toán</h3>
        <div className="row">
          <div className="col-lg-7">
            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </div>
          <div className="col-lg-5">
            <div className="border-green rounded-10 shadow p-4">
              <div className="warning">
                <h3>Lưu ý:</h3>
                <p className="fw-bold">
                  Quý khách chuyển khoản vui lòng nhập nội dung gồm: Tên và SĐT
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-7">
            <button
              type="submit"
              className={`btn-green mt-3 ${activeClassName(
                checkout.isLoading,
                "divDisable"
              )}`}
              onClick={onValid}
            >
              Đặt mua
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
