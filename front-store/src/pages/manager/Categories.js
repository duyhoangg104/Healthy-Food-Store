/** @format */

import React, { useEffect, useState } from "react";
import { BsFolderPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import CategoryList from "../../components/manager/CategoryList";
import NewCategoryModal from "../../components/manager/NewCategoryModal";
import {
  createCategoryRequest,
  toggleCategoryTypeRequest,
} from "../../store/api";
import { useGetCategoryListQuery } from "../../store/services/products";
import { handleShowNotification } from "../../utils/event";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { activeClassName } from "../../utils/helper";

export const MAX_ITEMS = 10;

const Categories = () => {
  useDocumentTitle("Danh sách danh mục");
  const { data, error, isLoading, refetch } = useGetCategoryListQuery("", {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [dataList, setDataList] = useState([]);
  const [openNewCategory, setOpenNewCategory] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [toggling, setToggling] = useState(false);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (data?.length) {
      setDataList(data);
    }
  }, [data]);

  useEffect(() => {
    if (error?.status === 401) {
      localStorage.removeItem("login_token");
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
  }, [error]);

  const onOpen = () => setOpenNewCategory(true);

  const onClose = () => {
    setOpenNewCategory(false);
    setSelectedCategory(null);
  };

  const onEdit = (category) => {
    setSelectedCategory(category);
    onOpen();
  };

  const createNewCategoryHandler = async (newCate, reset) => {
    setIsCreating(true);
    try {
      const submitData = {
        ...newCate,
      };
      if (selectedCategory) {
        submitData.id = selectedCategory._id;
      }
      await createCategoryRequest(submitData);
      refetch();
      reset();
      onClose();
    } catch (error) {
      handleShowNotification(
        error?.response?.data?.msg || "Tạo mới loại sản phẩm thất bại",
        "error",
        dispatch
      );
    } finally {
      setIsCreating(false);
    }
  };

  const toggleCategoryStatusHandler = async (category, status) => {
    setToggling(true);
    try {
      await toggleCategoryTypeRequest(category, status);
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setToggling(false);
    }
  };

  return (
    <div
      className={`${activeClassName(toggling, "divDisable divDisableWhite")}`}
    >
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn-green"
          onClick={() => {
            setSelectedCategory(null);
            onOpen();
          }}
        >
          <BsFolderPlus /> Thêm mới
        </button>
      </div>
      <CategoryList
        data={dataList}
        isLoading={isLoading}
        onTogglerStatus={toggleCategoryStatusHandler}
        onEdit={onEdit}
        selectedCategory={selectedCategory}
      />
      <NewCategoryModal
        open={openNewCategory}
        close={onClose}
        onCreateNewCategory={createNewCategoryHandler}
        isLoading={isCreating}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default Categories;
