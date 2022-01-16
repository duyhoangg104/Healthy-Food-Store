import React, { useEffect, useState } from "react";
import FilterStats from "../../components/manager/FilterStats";
import OrderList from "../../components/manager/OrderList";
import { useGetReportedOrderListQuery } from "../../store/services/orders";
import { activeClassName, formatter } from "../../utils/helper";

const Report = () => {
  const [startDate, onChangeStartDate] = useState(null);
  const [endDate, onChangeEndDate] = useState(null);
  const [employeeId, setEmployeeId] = useState("");
  const { data, isLoading, isFetching, refetch } = useGetReportedOrderListQuery(
    {
      startDate,
      endDate,
      employeeId,
    },
    {
      refetchOnMountOrArgChange: false,
    }
  );
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (data) {
      setOrderList(data);
    }
  }, [data]);

  const filterOrdersHandler = () => {
    refetch();
  };

  return (
    <div
      className={`${activeClassName(isFetching, "divDisable divDisableWhite")}`}
    >
      <h3>Báo cáo thống kê</h3>
      <FilterStats
        startDate={startDate}
        endDate={endDate}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
        employeeId={employeeId}
        setEmployeeId={setEmployeeId}
        onFilter={filterOrdersHandler}
      />
      <OrderList
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

export default Report;
