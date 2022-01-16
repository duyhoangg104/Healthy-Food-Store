/** @format */

import React from "react";
import "./index.scss";
import PropTypes from "prop-types";
import { DeleteSvgIcon } from "../../../constants/icons";
import { formatter } from "../../../utils/helper";
import { useMediaQuery } from "react-responsive";
import {
  decreaseProductQty,
  increaseProductQty,
  removeProductFromCart,
  calcTotal,
} from "../../../store/slice/cartSlice";
import { useDispatch } from "react-redux";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const CartDataList = ({ data, activatedDataList, isChecking }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 550px)" });
  const dispatch = useDispatch();

  return (
    <div className="cart-data__list">
      <div className="data-list table-responsive" style={{ minHeight: 150 }}>
        <table className="table mb-0">
          <thead>
            <tr>
              <th>No</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá đơn vị</th>
              <th>Giá tổng</th>
              <th className="text-center">Xóa</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <td> {index + 1} </td>
                <td>
                  <div className="data-list-title d-flex">
                    <div>
                      <img
                        className="me-2"
                        src={item.imageUrl}
                        alt={item.title}
                      />
                    </div>
                    <div>
                      <p className="mb-2">
                        {!isMobile
                          ? item.title
                          : item.title?.substr(0, 40) + "..."}
                      </p>
                      {!activatedDataList[index]?.isActivated &&
                        !isChecking && (
                          <p className="text-danger text-sm mb-0">
                            Sản phẩm vừa hết hàng
                          </p>
                        )}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="cart-product__qty">
                    <div className="input rounded divDisable divDisableWhite">
                      {item.qty}
                    </div>
                    <div className="btns">
                      <button
                        className="btn-green sm"
                        onClick={() => {
                          dispatch(increaseProductQty(item._id));
                          dispatch(calcTotal());
                        }}
                      >
                        <AiOutlinePlus />
                      </button>
                      <button
                        className="btn-green sm"
                        onClick={() => {
                          dispatch(decreaseProductQty(item._id));
                          dispatch(calcTotal());
                        }}
                      >
                        <AiOutlineMinus />
                      </button>
                    </div>
                  </div>
                </td>
                <td>{formatter.format(item.price)}</td>
                <td>{formatter.format(item.price * item.qty)}</td>
                <td>
                  <div className="actions">
                    <button
                      className="delete"
                      onClick={() => dispatch(removeProductFromCart(item._id))}
                    >
                      <DeleteSvgIcon fill="#ed4337" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

CartDataList.propTypes = {
  data: PropTypes.array,
  activatedDataList: PropTypes.array,
  isChecking: PropTypes.bool,
};

export default CartDataList;
