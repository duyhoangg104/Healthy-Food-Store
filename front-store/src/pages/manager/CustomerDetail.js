import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useGetCustomerOrderHistoryListQuery } from "../../store/services/orders";
import { formatter } from "../../utils/helper";
import Loader from "../../components/ui/loader";
import { BsArrowLeftShort } from "react-icons/bs";

const CustomerDetail = () => {
  const { state } = useLocation();
  const { id } = useParams();

  const { data, isFetching } = useGetCustomerOrderHistoryListQuery(id, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const userInfoMarkup = (userInfo) => {
    return (
      <div>
        <div className="row mb-3">
          <div className="col-sm-4">
            <strong>Tên khách hàng</strong>
          </div>
          <div className="col-sm-8">
            <strong>{userInfo?.fullName}</strong>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-4">
            <strong>Số điện thoại</strong>
          </div>
          <div className="col-sm-8">
            <strong>{userInfo?.phone}</strong>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-4">
            <strong>Email</strong>
          </div>
          <div className="col-sm-8">
            <strong>{userInfo?.email}</strong>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="d-flex mb-3 justify-content-between align-items-center">
        <h3>Thông tin khách hàng</h3>
        <Link to="/manager/customers" className="btn-green sm">
          <BsArrowLeftShort size={18} /> TRỞ LẠI DANH SÁCH
        </Link>
      </div>
      {state?.userInfo ? userInfoMarkup(state?.userInfo) : <div>No info</div>}
      {isFetching ? (
        <Loader />
      ) : (
        <div className="my-5">
          <div className="title">
            <h3 className="text-center">Danh sách đơn hàng</h3>
          </div>
          <div className="data-list table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã Hóa Đơn</th>
                  <th>Thời gian</th>
                  <th>Nhân viên</th>
                  <th>Giá Bán</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr key={item._id}>
                    <td> {index + 1} </td>
                    <td> {item._id} </td>
                    <td>{item.createdAt.substr(0, 19)}</td>
                    <td>{item.handleBy?.fullName}</td>
                    <td>{formatter.format(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="mb-3">
              <strong>Tổng số đơn hàng đã mua: {data?.length}</strong>
            </div>
            <div className="mb-3">
              <strong>
                Tổng doanh thu từ khách:{" "}
                {formatter.format(
                  data?.reduce((acc, item) => acc + item.total, 0) || 0
                )}
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDetail;
