import React, { useState } from "react";
import PropTypes from "prop-types";
import { MAX_ITEMS } from "../../pages/manager/Products";
import { activeClassName, formatter } from "../../utils/helper";
import Paginator from "../shared/paginator";
import Loader from "../ui/loader";
import "./index.scss";

const OrderList = ({ isLoading, dataList, dataListMinheight }) => {
  const [currPage, setCurrPage] = useState(0);

  const dataListStyle = {
    minHeight: dataListMinheight,
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <div
        className={`data-list table-responsive ${activeClassName(
          isLoading,
          "divDisable divDisableWhite"
        )}`}
        style={dataListStyle}
      >
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã Hóa Đơn</th>
              <th>Địa chỉ giao hàng</th>
              <th>Giá tiền</th>
            </tr>
          </thead>
          <tbody>
            {dataList
              ?.slice(currPage * MAX_ITEMS, (currPage + 1) * MAX_ITEMS)
              ?.map((item, index) => (
                <tr key={item._id}>
                  <td> {index + 1 + currPage * MAX_ITEMS} </td>
                  <td> {item._id} </td>
                  <td> {item.deliveryAddress.address}</td>
                  <td>{formatter.format(item.total)}</td>
                </tr>
              ))}
          </tbody>
        </table>
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

OrderList.propTypes = {
  isLoading: PropTypes.bool,
  dataList: PropTypes.array,
  dataListMinheight: PropTypes.string,
};

export default OrderList;
