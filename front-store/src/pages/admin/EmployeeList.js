/** @format */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import DataList from "../../components/admin/DataList";
import HeaderList from "../../components/admin/HeaderList";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { getUsersAction } from "../../store/actions/admin";

const EmployeeList = ({ onSearchUsers }) => {
  useDocumentTitle("Danh sách nhân viên");
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const { roles, isLoading } = useSelector((state) => state.global);

  const employeeRole = roles.find((role) => role.value === "employee");

  useEffect(() => {
    if (!isLoading) {
      dispatch(getUsersAction(`?role=${employeeRole?._id}`));
    }
  }, [dispatch, isLoading]);

  return (
    <div>
      <HeaderList
        title="Danh sách nhân viên"
        onSearchUsers={onSearchUsers}
        role={employeeRole?._id}
      />
      <DataList
        isLoading={users.isLoading}
        error={users.error}
        data={users.list}
      />
    </div>
  );
};

EmployeeList.propTypes = {
  onSearchUsers: PropTypes.func,
};

export default EmployeeList;
