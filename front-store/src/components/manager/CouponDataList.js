import React from "react";
import PropTypes from "prop-types";
import Loader from "../ui/loader";
import "./index.scss";
import { EditSvgIcon } from "../../constants/icons";
import { convertCouponTypeToVietnamese } from "../../utils/helper";
import ToggleCouponStatus from "./ToggleCouponStatus";

const CouponDataList = ({
  isLoading,
  data,
  onEditHandler,
  onTogglerStatus,
}) => {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="data-list table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên mã</th>
              <th>Loại mã</th>
              <th>Giảm giá</th>
              <th>Ngày hết hạn</th>
              <th className="text-center">Sửa</th>
              <th className="text-center">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={item._id}>
                <td> {index + 1} </td>
                <td> {item.value}</td>
                <td>{convertCouponTypeToVietnamese(item.type)}</td>
                <td>{item.percent}%</td>
                <td>
                  {new Date(item.expiredDate).toLocaleDateString("vi-VN")}
                </td>
                <td>
                  <div className="actions">
                    <button
                      className="me-3"
                      onClick={() => onEditHandler(item)}
                    >
                      <EditSvgIcon />
                    </button>
                  </div>
                </td>
                <td>
                  <div className="actions">
                    <ToggleCouponStatus
                      item={item}
                      onToggle={onTogglerStatus}
                    />
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

CouponDataList.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.array,
  onEditHandler: PropTypes.func,
  onTogglerStatus: PropTypes.func,
};

export default CouponDataList;
