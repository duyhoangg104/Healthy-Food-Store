/** @format */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserDataList from "../../components/admin/DataList";
import CustomerHeaderList from "../../components/manager/HeaderList";
import Paginator from "../../components/shared/paginator";
import { searchUsersByNameRequest } from "../../store/api/users";
import { useGetCustomerListQuery } from "../../store/services/users";
import { MAX_ITEMS } from "./Products";
import { handleShowNotification } from "../../utils/event";
import { useDispatch } from "react-redux";

const Customers = () => {
  const [currPage, setCurrPage] = useState(0);
  const { data, isLoading, error, refetch } = useGetCustomerListQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const history = useHistory();
  const [searching, setSearching] = useState(false);
  const [dataList, setDataList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setDataList(data);
    }
  }, [data]);

  useEffect(() => {
    if (error?.status === 401) {
      localStorage.removeItem("login_token");
      if (!window.location.pathname.includes("/login")) {
        history.push("/login");
      }
    }
  }, [error]);

  const searchCustomerByNameHandler = async (nameRegex) => {
    setSearching(true);
    try {
      const { data } = await searchUsersByNameRequest(nameRegex);
      if (!data?.length) {
        handleShowNotification(
          "Thông tin khách hàng không có trong dữ liệu",
          "error",
          dispatch
        );
        return;
      }
      setDataList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div>
      <CustomerHeaderList
        isLoading={searching}
        onSearch={searchCustomerByNameHandler}
        reset={() => {
          refetch();
          setDataList(data);
        }}
      />
      <UserDataList
        data={dataList?.slice(currPage * MAX_ITEMS, (currPage + 1) * MAX_ITEMS)}
        isLoading={isLoading}
        actionTitle="Thông tin"
        viewMode
        viewHref="/manager/customer-info/"
        currPage={currPage}
      />
      <Paginator
        maxPage={Math.ceil(dataList.length / MAX_ITEMS)}
        curPage={currPage}
        setCurPage={setCurrPage}
        isLoading={isLoading}
        scrollAfterClicking
      />
    </div>
  );
};

export default Customers;
