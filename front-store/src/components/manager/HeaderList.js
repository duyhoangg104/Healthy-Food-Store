/** @format */

import React, { useState } from "react";
import PropTypes from "prop-types";
import "./index.scss";

const HeaderList = ({ title, onSearch, isLoading, reset }) => {
  const [input, setInput] = useState("");

  return (
    <div
      className={`header-list ${isLoading ? "divDisable divDisableWhite" : ""}`}
    >
      <h3 className="header-list__title"> {title || ""} </h3>
      <form
        className="header-search__list"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(input);
        }}
      >
        <input
          placeholder="Nhập keywords..."
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (e.target.value === "") {
              reset();
            }
          }}
        />
        <button type="submit">Tìm kiếm</button>
      </form>
    </div>
  );
};

HeaderList.propTypes = {
  title: PropTypes.string,
  onSearch: PropTypes.func,
  isLoading: PropTypes.bool,
  reset: PropTypes.func,
};

export default HeaderList;
