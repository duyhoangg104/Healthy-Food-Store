import React from "react";
import OrderList from "../../components/profiles/OrderList";
import Loader from "../../components/ui/loader";
import { useGetOrderHistoryListQuery } from "../../store/services/orders";

const OrderHistory = () => {
  const { data, isLoading, refetch } = useGetOrderHistoryListQuery(null, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && !data?.length) {
    return <p className="text-center text-greee">Không có đơn hàng</p>;
  }

  return <OrderList list={data} refetch={refetch} />;
};

export default OrderHistory;
