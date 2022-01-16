import React, { useRef } from "react";
import "./index.scss";
import { useParams } from "react-router-dom";
import Loader from "../../components/ui/loader";
import Logo from "../../components/ui/logo";
import { useGetOrderDetailQuery } from "../../store/services/orders";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { formatter } from "../../utils/helper";
import { AiFillPrinter } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";
import { useDispatch } from "react-redux";
import { handleShowNotification } from "../../utils/event";

const OrderInvoicePrint = () => {
  useDocumentTitle("HÓA ĐƠN BÁN HÀNG");
  const { id } = useParams();
  const { data, isLoading } = useGetOrderDetailQuery(id, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const dispatch = useDispatch();

  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `HÓA_ĐƠN_BÁN_HÀNG_${id}`,
    onPrintError: (err) =>
      handleShowNotification(err?.message, "error", dispatch),
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="order-invoice" ref={printRef}>
        <div className="sheet shadow rounded pb-3">
          <Logo link="/employee" maxWidth={120} />
          <div className="page-title">
            <h1>HÓA ĐƠN BÁN HÀNG</h1>
          </div>
          <div className="row px-3">
            <div className="col-4">
              <strong>Ngày bán :</strong>
            </div>
            <div className="col-8">
              <p>
                {new Date(data.createdAt).toLocaleDateString()} -{" "}
                {new Date(data.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="row px-3">
            <div className="col-4">
              <strong>Mã hóa đơn :</strong>
            </div>
            <div className="col-8">
              <p>{data?._id}</p>
            </div>
          </div>
          <div className="row px-3">
            <div className="col-4">
              <strong>Tên khách hàng :</strong>
            </div>
            <div className="col-8">
              <p>{data?.deliveryAddress?.name}</p>
            </div>
          </div>
          <div className="row px-3">
            <div className="col-4">
              <strong>Số điện thoại :</strong>
            </div>
            <div className="col-8">
              <p>{data?.deliveryAddress?.phone}</p>
            </div>
          </div>
          <div className="row px-3">
            <div className="col-4">
              <strong>Địa chỉ : </strong>
            </div>
            <div className="col-8">
              <p>{data?.deliveryAddress?.address}</p>
            </div>
          </div>
          <div className="product-table px-3 mb-3">
            <div className="data-list table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Giá bán</th>
                    <th>Số lượng</th>
                    <th>Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.products?.map((item) => (
                    <tr key={item._id}>
                      <td> {item.title?.substr(0, 18)}... </td>
                      <td> {formatter.format(item.price)}</td>
                      <td>{item.qty}</td>
                      <td> {formatter.format(item.price * item.qty)} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="divider w-1" />
          <div className="px-3 d-flex mt-3 justify-content-between">
            <span>Phí vận chuyển</span>
            <span>
              {formatter.format(data?.deliveryMethod === "ship" ? 30000 : 0)}
            </span>
          </div>
          <div className="px-3 d-flex mt-3 justify-content-between">
            <span>Hình thức thanh toán</span>
            <span>{data?.paymentMethod?.toUpperCase()}</span>
          </div>
          <div className="px-3 d-flex mt-3 justify-content-between">
            <h5>Tổng</h5>
            <span> {formatter.format(data?.total)} </span>
          </div>
          <p className="text-center mt-3">Chỉ xuất hóa đơn trong ngày!</p>
          <button className="print-btn btn-green" onClick={handlePrint}>
            In <AiFillPrinter size={24} />
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderInvoicePrint;
