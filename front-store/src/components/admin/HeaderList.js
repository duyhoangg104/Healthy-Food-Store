/** @format */

import React from "react";
import PropTypes from "prop-types";
import "./index.scss";
import { useSelector } from "react-redux";
import { activeClassName } from "../../utils/helper";

const HeaderList = ({ title, onSearchUsers, role }) => {
  const [value, setValue] = React.useState("");
  const { users } = useSelector((state) => state.admin);

  return (
    <div className="header-list">
      <h3 className="header-list__title"> {title} </h3>
      <form
        className="header-search__list"
        onSubmit={(e) => {
          e.preventDefault();
          onSearchUsers(value.trim().toLowerCase(), role);
        }}
      >
        <input
          placeholder="Nhập tên,Email"
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (!e.target.value) {
              onSearchUsers(e.target.value, role);
            }
          }}
        />
        <button
          type="submit"
          className={`${activeClassName(users.isLoading, "divDisable")}`}
        >
          Tìm kiếm
        </button>
      </form>
    </div>
  );
};

HeaderList.propTypes = {
  title: PropTypes.string,
  onSearchUsers: PropTypes.func,
  role: PropTypes.string,
};

export default HeaderList;
