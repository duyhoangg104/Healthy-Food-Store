/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { activeClassName } from "../../../utils/helper";
import "./index.scss";

const Search = () => {
  const params = new URL(document.location).searchParams;
  const q = params.get("q");
  const history = useHistory();
  const [query, setQuery] = useState(q || "");

  return (
    <form
      className="search-box d-md-flex d-none shadow-lg"
      onSubmit={(e) => {
        e.preventDefault();
        history.push(`/menu?q=${query}`);
      }}
    >
      <input
        type="text"
        placeholder="Sản phẩm ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        maxLength={80}
      />
      <button className={`${activeClassName(!query?.trim(), "divDisable")}`}>
        Tìm Kiếm
      </button>
    </form>
  );
};

export default Search;
