/** @format */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./index.scss";
import Loader from "../ui/loader";
import { EditSvgIcon } from "../../constants/icons";
import { BsSearch } from "react-icons/bs";
import { convertGenderToVietnamese } from "../../utils/helper";
import { useHistory } from "react-router-dom";
import DeactivateUserModal from "./DeactivateUserModal";
import { deleteUserRequest } from "../../store/api";
import ToggleUserStatus from "./ToggleUserStatus";
import { useDispatch } from "react-redux";
import { toggleUserActivateStatus } from "../../store/slice/adminSlice";

const UserDataList = ({
  data,
  isLoading,
  actionTitle,
  viewMode,
  viewHref,
  currPage,
}) => {
  const history = useHistory();
  const [deactivating, setDeactivating] = useState(false);
  const [user, setUser] = useState({});
  const [processing, setProcessing] = useState(false);
  const [dataList, setDataList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.length) {
      setDataList(data);
    } else {
      setDataList([]);
    }
  }, [data, currPage]);

  const onClose = () => {
    setDeactivating(false);
    setUser({});
  };

  const deactivateUserHandler = async () => {
    setProcessing(true);
    try {
      const { data: dataDelete } = await deleteUserRequest(
        user._id,
        !user.isActivated
      );
      onClose();
      setDataList((prevState) =>
        prevState.map((item) =>
          item._id === dataDelete.deletedUserId
            ? { ...item, isActivated: !item.isActivated }
            : item
        )
      );
      dispatch(toggleUserActivateStatus(dataDelete.deletedUserId));
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && !data?.length) {
    return (
      <div className="data-list">
        <div className="text-center my-5">Thông tin không có trong dữ liệu</div>
      </div>
    );
  }

  return (
    <div className="data-list table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Email</th>
            <th>Họ Tên</th>
            <th>Điện Thoại</th>
            <th>Giới Tính</th>
            <th>Ngày Sinh</th>
            <th>
              <div className="text-center">
                {actionTitle ? actionTitle : "Sửa"}
              </div>
            </th>
            <th>
              <div className="text-center">Kích hoạt</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1 + (currPage || 0) * 10}</td>
              <td> {item.email} </td>
              <td>{item.fullName}</td>
              <td>{item.phone}</td>
              <td>{convertGenderToVietnamese(item.gender)}</td>
              <td>{item.birthDate?.substr(0, 10)}</td>
              <td>
                {viewMode ? (
                  <div className="actions view">
                    <button
                      className="me-3"
                      onClick={() =>
                        history.push(`${viewHref}${item._id}`, {
                          userInfo: item,
                        })
                      }
                    >
                      <BsSearch />
                    </button>
                  </div>
                ) : (
                  <div className="actions">
                    <button
                      className="me-3"
                      onClick={() =>
                        history.push(`/admin/edit-user/${item._id}`)
                      }
                    >
                      <EditSvgIcon />
                    </button>
                  </div>
                )}
              </td>
              <td>
                <div className="actions">
                  <ToggleUserStatus
                    onToggle={() => {
                      setUser(item);
                      setDeactivating(true);
                    }}
                    isActive={item.isActivated}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeactivateUserModal
        open={deactivating}
        user={user}
        close={onClose}
        onDeactivateUser={deactivateUserHandler}
        isLoading={processing}
      />
    </div>
  );
};

UserDataList.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  actionTitle: PropTypes.string,
  viewMode: PropTypes.bool,
  viewHref: PropTypes.string,
  currPage: PropTypes.number,
};

export default UserDataList;
