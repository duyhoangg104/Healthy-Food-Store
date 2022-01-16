import React, { useEffect, useState } from "react";
import FilterOrders from "../../components/shipper/FilterOrders";
import ShippedOrderList from "../../components/shipper/ShippedOrderList";
import { useGetShippedOrderListQuery } from "../../store/services/orders";
import { formatter } from "../../utils/helper";
import "./index.scss";

const ShippingHistory = () => {
  const [startDate, onChangeStartDate] = useState(null);
  const [endDate, onChangeEndDate] = useState(null);
  const { data, isLoading, isFetching, refetch } = useGetShippedOrderListQuery({
    startDate,
    endDate,
  });
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (data) {
      setOrderList(data);
    }
  }, [data]);

  return (
    <div className="shipper-shipping__history">
      <h4 className="my-3">Báo cáo thống kê</h4>
      <FilterOrders
        onFilterByDate={refetch}
        isLoading={isFetching}
        startDate={startDate}
        endDate={endDate}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
      />
      <ShippedOrderList
        isLoading={isLoading}
        dataList={orderList}
        dataListMinheight="auto"
      />
      <div className={`summary ${isLoading ? "d-none" : ""}`}>
        <p>
          Tổng số đơn hàng đã giao trong khoảng thời gian chọn: {data?.length}
        </p>
        <p>
          Tổng doanh thu:{" "}
          {formatter.format(
            data?.reduce((acc, orderItem) => acc + orderItem.total, 0)
          )}
        </p>
      </div>
    </div>
  );
};

export default ShippingHistory;
