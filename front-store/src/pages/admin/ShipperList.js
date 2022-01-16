/** @format */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import DataList from "../../components/admin/DataList";
import HeaderList from "../../components/admin/HeaderList";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { getUsersAction } from "../../store/actions/admin";

const ShipperList = ({ onSearchUsers }) => {
  useDocumentTitle("Danh sách shipper");
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const { roles, isLoading } = useSelector((state) => state.global);

  const shipperRole = roles.find((role) => role.value === "shipper");

  useEffect(() => {
    if (!isLoading) {
      dispatch(getUsersAction(`?role=${shipperRole?._id}`));
    }
  }, [dispatch, isLoading]);

  return (
    <div>
      <HeaderList
        title="Danh sách shipper"
        onSearchUsers={onSearchUsers}
        role={shipperRole?._id}
      />
      <DataList
        isLoading={users.isLoading}
        error={users.error}
        data={users.list}
      />
    </div>
  );
};

ShipperList.propTypes = {
  onSearchUsers: PropTypes.func,
};

export default ShipperList;
