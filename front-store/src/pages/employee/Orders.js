import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import HeaderList from "../../components/employee/OrderHeaderList";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useGetPendingOrderListQuery } from "../../store/services/orders";
import { AiFillPrinter } from "react-icons/ai";
import { activeClassName, formatter } from "../../utils/helper";
import Loader from "../../components/ui/loader";
import { useGetShipperListQuery } from "../../store/services/users";
import SelectShipper from "../../components/employee/SelectShipper";
import { assignOrderToShipperRequest } from "../../store/api";
import {
  handleShowMultipleErrors,
  handleShowNotification,
} from "../../utils/event";
import { useDispatch } from "react-redux";
import Paginator from "../../components/shared/paginator";
import { MAX_ITEMS } from "../manager/Products";
import { getPendingOrdersByOrderIdQueryRequest } from "../../store/api/orders";

const Orders = () => {
  useDocumentTitle("Quản lý đơn hàng");
  const { data, isLoading } = useGetPendingOrderListQuery(null, {
    refetchOnReconnect: true,
  });

  const { data: datShipperList, isLoading: isLoadingShipperList } =
    useGetShipperListQuery(null, {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    });

  const [dataList, setDataList] = useState([]);
  const [assigning, setAssigning] = useState(false);
  const [currPage, setCurrPage] = useState(0);
  const dispatch = useDispatch();
  const [searching, setSearching] = useState(false);
  const [orderIdValue, setOrderIdValue] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    if (data?.length) {
      setDataList(data);
    }
  }, [data]);

  useEffect(() => {
    onFilterOrderByStatus();
  }, [orderStatus]);

  const assignOrderToShipper = async (orderId, shipperId) => {
    setAssigning(true);
    try {
      const { data: dataRes } = await assignOrderToShipperRequest({
        orderId,
        shipperId,
      });
      handleShowNotification(dataRes.msg, "success", dispatch);
      setDataList((prevState) =>
        prevState.map((item) =>
          item._id === orderId
            ? {
                ...item,
                deliveryBy: shipperId,
                status: "waiting",
              }
            : item
        )
      );
    } catch (error) {
      const { data: dataError } = error?.response;
      if (dataError.errors) {
        handleShowMultipleErrors(data.errors, dispatch);
      }
      if (dataError.msg && !dataError.errors) {
        handleShowNotification(
          dataError?.msg || "Giao đơn thất bại",
          "error",
          dispatch
        );
      }
    } finally {
      setAssigning(false);
    }
  };

  const searchOrderHandler = async (orderIdQuery) => {
    setSearching(true);
    setOrderStatus("");
    try {
      const { data } = await getPendingOrdersByOrderIdQueryRequest(
        orderIdQuery
      );
      setDataList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setSearching(false);
    }
  };

  const onFilterOrderByStatus = () => {
    if (orderStatus === "pending") {
      setDataList(
        data.filter(
          (item) =>
            item.paymentMethod === "cod" ||
            (item.paymentMethod === "paypal" && item.paidAt)
        )
      );
    }
    if (orderStatus === "pending-unpaid") {
      setDataList(
        data.filter((item) => item.paymentMethod === "paypal" && !item.paidAt)
      );
    }
  };

  if (isLoading || isLoadingShipperList) {
    return <Loader />;
  }

  return (
    <div
      className={`order-list__handling ${activeClassName(
        searching,
        "divDisable divDisableWhite"
      )}`}
    >
      <HeaderList
        title="Danh sách đơn hàng"
        onSearch={searchOrderHandler}
        isLoading={searching}
        value={orderIdValue}
        setValue={setOrderIdValue}
        orderStatus={orderStatus}
        setOrderStatus={setOrderStatus}
      />
      {!dataList.length && !isLoading && (
        <div className="text-center my-5">Hóa đơn không tồn tại</div>
      )}
      <div
        className={`data-list table-responsive ${activeClassName(
          assigning,
          "divDisable divDisableWhite"
        )} ${activeClassName(!dataList.length && !isLoading, "d-none")}`}
      >
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã đơn hàng</th>
              <th>Giờ đặt hàng</th>
              <th>Giá bán</th>
              <th>Trạng thái</th>
              <th>Thanh toán</th>
              <th>In hóa đơn</th>
            </tr>
          </thead>
          <tbody>
            {dataList
              ?.slice(currPage * MAX_ITEMS, (currPage + 1) * MAX_ITEMS)
              ?.map((item, index) => (
                <tr key={item._id}>
                  <td> {index + 1 + MAX_ITEMS * currPage} </td>
                  <td> {item._id} </td>
                  <td>
                    {new Date(item.createdAt).toLocaleDateString()} -{" "}
                    {new Date(item.createdAt).toLocaleTimeString()}
                  </td>
                  <td>{formatter.format(item.total)}</td>
                  <td>
                    <div className="position-relative mw-174">
                      <SelectShipper
                        datShipperList={datShipperList}
                        item={item}
                        assignOrderToShipper={assignOrderToShipper}
                      />
                    </div>
                  </td>
                  <td>{item.paymentMethod === "cod" ? "COD" : "Paypal"}</td>
                  <td>
                    <div className="actions">
                      <Link to={`/employee/print-order/${item._id}`}>
                        <AiFillPrinter size={32} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Paginator
        maxPage={Math.ceil(dataList?.length / MAX_ITEMS)}
        curPage={currPage}
        setCurPage={setCurrPage}
        isLoading={isLoading || isLoadingShipperList}
        scrollAfterClicking
      />
    </div>
  );
};

export default Orders;
