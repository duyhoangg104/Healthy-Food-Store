/** @format */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import DataList from "../../components/admin/DataList";
import HeaderList from "../../components/admin/HeaderList";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { getUsersAction } from "../../store/actions/admin";

const ManagerList = ({ onSearchUsers }) => {
  useDocumentTitle("Danh sách quản lý");
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const { roles, isLoading } = useSelector((state) => state.global);

  const managerRole = roles.find((role) => role.value === "manager");

  useEffect(() => {
    if (!isLoading) {
      dispatch(getUsersAction(`?role=${managerRole?._id}`));
    }
  }, [dispatch, isLoading]);

  return (
    <div>
      <HeaderList
        title="Danh sách quản lý"
        onSearchUsers={onSearchUsers}
        role={managerRole?._id}
      />
      <DataList
        isLoading={users.isLoading}
        error={users.error}
        data={users.list}
      />
    </div>
  );
};

ManagerList.propTypes = {
  onSearchUsers: PropTypes.func,
};

export default ManagerList;
