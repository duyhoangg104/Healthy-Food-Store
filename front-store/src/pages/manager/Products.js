/** @format */

import React, { useEffect, useState } from "react";
import HeaderList from "../../components/manager/HeaderList";
import ProductList from "../../components/manager/ProductList";
import {
  useGetCategoryListQuery,
  useGetProductListQuery,
} from "../../store/services/products";
import Paginator from "../../components/shared/paginator";
import { searchProductByTitleRequest } from "../../store/api";
import { handleShowNotification } from "../../utils/event";
import { useDispatch } from "react-redux";

export const MAX_ITEMS = 10;

const Products = () => {
  const [currPage, setCurrPage] = useState(0);
  const { data: categoryData, error } = useGetCategoryListQuery("", {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const { data, isLoading, refetch } = useGetProductListQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [dataList, setDataList] = useState([]);
  const [searching, setSearching] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.length) {
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

  const onSearchMealHandler = async (input) => {
    if (!input.trim()) {
      setDataList(data);
      return;
    }
    setSearching(true);
    try {
      const { data: searchData } = await searchProductByTitleRequest(
        input.toLowerCase()
      );
      setDataList(searchData);
      if (!searchData.length) {
        handleShowNotification(
          "Thông tin sản phẩm không có trong dữ liệu",
          "error",
          dispatch
        );
      }
    } catch (errors) {
      console.log(errors);
    } finally {
      setSearching(false);
    }
  };

  const onResetList = () => {
    refetch();
    setDataList(data);
  };

  return (
    <div>
      <HeaderList
        title="Danh sách sản phẩm"
        isLoading={searching}
        onSearch={onSearchMealHandler}
        reset={onResetList}
      />
      <ProductList
        data={dataList?.slice(currPage * MAX_ITEMS, (currPage + 1) * MAX_ITEMS)}
        isLoading={isLoading}
        categoryList={categoryData || []}
        currentPage={currPage}
        setRootDataList={setDataList}
        fetchNewestData={refetch}
      />
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

export default Products;
