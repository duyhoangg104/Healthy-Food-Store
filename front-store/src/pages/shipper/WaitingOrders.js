import React, { useEffect, useState } from "react";
import "./index.scss";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useGetWaitingOrderListQuery } from "../../store/services/orders";
import { activeClassName, formatter } from "../../utils/helper";
import Loader from "../../components/ui/loader";
import { handleAssignedOrderRequest } from "../../store/api";
import {
  handleShowMultipleErrors,
  handleShowNotification,
} from "../../utils/event";
import { useDispatch } from "react-redux";
import Paginator from "../../components/shared/paginator";
import { MAX_ITEMS } from "../manager/Products";
import { useMediaQuery } from "react-responsive";
import MobileOrderItem from "../../components/shipper/MobileOrderItem";

const WaitingOrders = () => {
  useDocumentTitle("Đơn hàng chờ nhận");
  const { data, isLoading } = useGetWaitingOrderListQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [dataList, setDataList] = useState([]);
  const [handling, setHandling] = useState(false);
  const [currPage, setCurrPage] = useState(0);
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 890px)" });

  useEffect(() => {
    if (data?.length) {
      setDataList(data);
    }
  }, [data]);

  const handleAssignedOrderFromEmployee = async (orderId, type) => {
    setHandling(true);
    try {
      const { data: dataRes } = await handleAssignedOrderRequest(
        { orderId },
        type
      );
      handleShowNotification(dataRes.msg, "success", dispatch);
      setDataList((prevState) =>
        prevState.filter((item) => item._id !== orderId)
      );
    } catch (error) {
      const { data: dataError } = error?.response;
      if (dataError.errors) {
        handleShowMultipleErrors(data.errors, dispatch);
      }
      if (dataError.msg && !dataError.errors) {
        handleShowNotification(
          dataError?.msg || "Nhận đơn/Hủy đơn thất bại",
          "error",
          dispatch
        );
      }
    } finally {
      setHandling(false);
    }
  };

  const renderListOrder = () => {
    if (isMobileScreen) {
      return dataList
        ?.slice(currPage * MAX_ITEMS, (currPage + 1) * MAX_ITEMS)
        ?.map((item) => (
          <MobileOrderItem
            key={item._id}
            order={item}
            handleAssignedOrderFromEmployee={handleAssignedOrderFromEmployee}
          />
        ));
    }
    return (
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã đơn hàng</th>
            <th>Địa chỉ giao hàng</th>
            <th>SĐT</th>
            <th>Giá bán</th>
            <th>Thanh toán</th>
            <th>Xác nhận đơn hàng</th>
          </tr>
        </thead>
        <tbody>
          {dataList
            ?.slice(currPage * MAX_ITEMS, (currPage + 1) * MAX_ITEMS)
            ?.map((item, index) => (
              <tr key={item._id}>
                <td> {index + 1} </td>
                <td> {item._id} </td>
                <td> {item.deliveryAddress.address}</td>
                <td> {item.deliveryAddress.phone} </td>
                <td>{formatter.format(item.total)}</td>
                <td>{item.paymentMethod === "cod" ? "COD" : "Paypal"}</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <button
                      className="btn-green sm me-2"
                      onClick={() =>
                        handleAssignedOrderFromEmployee(item._id, "shipping")
                      }
                    >
                      Xác nhận
                    </button>
                    <button
                      className="btn-green sm red"
                      onClick={() =>
                        handleAssignedOrderFromEmployee(item._id, "reject")
                      }
                    >
                      Hủy
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="order-list__handling">
      <h4 className="my-3">Danh sách đơn hàng chờ nhận</h4>
      <div
        className={`data-list table-responsive ${activeClassName(
          handling,
          "divDisable divDisableWhite"
        )}`}
      >
        {renderListOrder()}
      </div>
      <Paginator
        maxPage={Math.ceil(dataList?.length / MAX_ITEMS)}
        curPage={currPage}
        setCurPage={setCurrPage}
        isLoading={isLoading}
        scrollAfterClicking
      />
    </div>
  );
};

export default WaitingOrders;
