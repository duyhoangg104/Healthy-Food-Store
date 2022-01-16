import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  activeClassName,
  convertOrderStatusToVietnamese,
  formatter,
} from "../../utils/helper";
import PaymentButton from "./PaymentButton";
import { createOrderPaymentRequest, cancelOrderRequest } from "../../store/api";
import { handleShowNotification } from "../../utils/event";
import { useDispatch } from "react-redux";

const OrderList = ({ list, refetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [currentOrderId, setCurrentOrderId] = useState(null);

  const handleCreatePayment = async (orderId) => {
    setIsLoading(true);
    setCurrentOrderId(orderId);
    try {
      const { data } = await createOrderPaymentRequest({ orderId });
      window.location.assign(data.redirectUrl);
    } catch (error) {
      handleShowNotification(
        error?.response?.data?.msg || error?.message || "Falied",
        "error",
        dispatch
      );
    } finally {
      setIsLoading(false);
      setCurrentOrderId(null);
    }
  };

  const handleCancelOrder = async (orderId) => {
    setIsLoading(true);
    setCurrentOrderId(orderId);
    try {
      const { data } = await cancelOrderRequest({ orderId });
      handleShowNotification(data?.msg, "success", dispatch);
      refetch();
    } catch (error) {
      handleShowNotification(
        error?.response?.data?.msg || error?.message || "Falied",
        "error",
        dispatch
      );
    } finally {
      setIsLoading(false);
      setCurrentOrderId(null);
    }
  };

  return (
    <div>
      <div className="data-list table-responsive mh-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Ngày mua</th>
              <th>Giá trị</th>
              <th>Thanh toán</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {list?.map((item, index) => (
              <tr key={item._id}>
                <td> {index + 1} </td>
                <td>
                  <ul>
                    {item.products.map((product) => (
                      <li key={product.productId} className="text-sm">
                        {product.title}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{item.products.length}</td>
                <td>{item.createdAt.substr(0, 10)}</td>
                <td>{formatter.format(item.total)}</td>
                <td>
                  {item.paymentMethod === "cod" ? (
                    "COD"
                  ) : (
                    <PaymentButton
                      item={item}
                      handleCreatePayment={handleCreatePayment}
                      isLoading={isLoading}
                      currentOrderId={currentOrderId}
                    />
                  )}
                </td>
                <td>
                  <strong className="text-green text-sm">
                    {convertOrderStatusToVietnamese(item.status)}
                  </strong>
                  <br />
                  {item.status === "pending" && (
                    <button
                      className={`btn btn-link text-danger ${activeClassName(
                        isLoading,
                        "divDisable divDisableWhite"
                      )}`}
                      onClick={() => handleCancelOrder(item._id)}
                    >
                      Hủy đơn
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

OrderList.propTypes = {
  list: PropTypes.array,
  refetch: PropTypes.func,
};

export default OrderList;
