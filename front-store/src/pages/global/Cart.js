/** @format */

import React, { useEffect, useState } from "react";
import "./styles/cart.scss";
import { useDispatch, useSelector } from "react-redux";
import CartDataList from "../../components/global/CartDataList";
import { resetCart } from "../../store/slice/cartSlice";
import { activeClassName, formatter } from "../../utils/helper";
import { Link } from "react-router-dom";
import EmptyCart from "../../components/global/EmptyCart";
import useScrollTop from "../../hooks/useScrollTop";
import { checkProductActivatedStatusRequest } from "../../store/api/product";

const Cart = () => {
  useScrollTop();
  const { list, total } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(false);
  const [activatedDataList, setActivatedDataList] = useState([]);
  const [checkStatusError, setCheckStatusError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    checkAllProductActivatedStatus();
  }, [list]);

  function checkAllProductActivatedStatus() {
    setIsChecking(true);
    const promises = list.map((listItem) =>
      checkProductActivatedStatusRequest(listItem._id)
    );
    // eslint-disable-next-line no-undef
    Promise.all(promises)
      .then((values) => {
        setActivatedDataList(values.map((value) => value.data));
      })
      .catch((errors) => setCheckStatusError(errors))
      .finally(() => setIsChecking(false));
  }

  if (!list.length) {
    return <EmptyCart />;
  }

  if (checkStatusError && !isChecking) {
    return <EmptyCart />;
  }

  return (
    <div
      className={`cart-wrapper my-5 ${activeClassName(
        isChecking,
        "divDisable, divDisableWhite"
      )}`}
    >
      <div className="container">
        <div className="page-title">
          <h1>Giỏ hàng</h1>
        </div>
      </div>
      <div className="container-custom">
        <CartDataList
          data={list}
          activatedDataList={activatedDataList}
          isChecking={isChecking}
        />
      </div>
      <div className="subtotal">
        <div className="container">
          <div className="d-sm-flex py-3 justify-content-end align-items-center">
            <div>
              <strong className="me-3 d-inline-block">Tổng giá trị </strong>
              <strong>{formatter.format(total)}</strong>
            </div>
          </div>
        </div>
      </div>
      {total > 0 && (
        <div className="actions my-4 px-3">
          <div className="d-md-flex align-items-center justify-content-between">
            <button
              className="btn-green btn-red mb-2 mb-sm-0 btn-cart"
              onClick={() => dispatch(resetCart())}
            >
              Xóa tất cả
            </button>
            <div>
              <Link to="/menu" className="btn-green btn-cart me-3">
                Tiếp tục mua
              </Link>
              <Link
                to={
                  isAuthenticated ? "/checkout" : `/login?destination=/checkout`
                }
                className={`btn-green btn-cart ${activeClassName(
                  activatedDataList.some((item) => !item.isActivated),
                  "divDisable"
                )}`}
              >
                Thanh toán
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
