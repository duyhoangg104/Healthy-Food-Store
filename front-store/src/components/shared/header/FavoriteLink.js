/** @format */

import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const FavoriteLink = ({ favorites }) => {
  return (
    <li className="nav-link__item  position-relative">
      <NavLink to="/wish-list" activeClassName="nav-link__active">
        Yêu Thích
      </NavLink>
      <span
        className={`header-item__badge ${favorites.length > 0 ? "" : "d-none"}`}
        style={{
          right: -7,
          top: -11,
          width: 20,
          height: 20,
          fontSize: 11,
        }}
      >
        {favorites.length}
      </span>
    </li>
  );
};

FavoriteLink.propTypes = {
  favorites: PropTypes.array,
};
export default FavoriteLink;
