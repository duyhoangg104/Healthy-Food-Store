import React from "react";
import PropTypes from "prop-types";
import Loader from "../ui/loader";
import "./index.scss";
import { EditSvgIcon } from "../../constants/icons";
import SwitchCategoryStatus from "./SwitchCategoryStatus";

const CategoryList = ({ isLoading, data, onTogglerStatus, onEdit }) => {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="data-list table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tiêu đề</th>
              <th>Mô tả</th>
              <th>Sản phẩm</th>
              <th>Loại</th>
              <th>Sửa</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={item._id}>
                <td> {index + 1} </td>
                <td> {item.title}</td>
                <td>{item.description?.substr(0, 70)}</td>
                <td>{item.products?.length}</td>
                <td>
                  <SwitchCategoryStatus
                    item={item}
                    onTogglerStatus={onTogglerStatus}
                  />
                </td>
                <td>
                  <div className="actions">
                    <button onClick={() => onEdit(item)}>
                      <EditSvgIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

CategoryList.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.array,
  onTogglerStatus: PropTypes.func,
  onEdit: PropTypes.func,
};

export default CategoryList;
