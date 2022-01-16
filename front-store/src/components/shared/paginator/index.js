/** @format */

import React from "react";
import PropTypes from "prop-types";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import "./index.scss";

const Paginator = ({
  maxPage = 10,
  curPage,
  setCurPage,
  isLoading,
  scrollAfterClicking,
}) => {
  if (isLoading) {
    return "";
  }
  if (!maxPage || maxPage <= 1) {
    return "";
  }
  return (
    <div className="paginator-wrap">
      <ul
        className="paginator c__paginator"
        style={{
          width: "fit-content !important",
        }}
      >
        <li
          className={`paginator__item paginator__item--prev ${
            curPage === 0 ? "divDisable divDisableBgNone" : ""
          }`}
        >
          <button
            onClick={() => {
              setCurPage((prevState) => prevState - 1);
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <BiChevronLeft size={36} color="#427F50" />
          </button>
        </li>
        {Array(maxPage)
          .fill(1)
          .map((_, index) => (
            <li
              key={index}
              className={`paginator__item ${
                curPage === index ? "paginator__item--active" : ""
              }`}
            >
              <button
                onClick={() => {
                  setCurPage(index);
                  if (scrollAfterClicking) {
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                {index + 1}
              </button>
            </li>
          ))}
        <li
          className={`paginator__item paginator__item--next ${
            curPage === maxPage - 1 ? "divDisable divDisableBgNone" : ""
          }`}
        >
          <button
            onClick={() => {
              setCurPage((prevState) => prevState + 1);
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <BiChevronRight size={36} color="#427F50" />
          </button>
        </li>
      </ul>
    </div>
  );
};

Paginator.propTypes = {
  maxPage: PropTypes.number,
  curPage: PropTypes.number,
  setCurPage: PropTypes.func,
  isLoading: PropTypes.bool,
  scrollAfterClicking: PropTypes.bool,
};

export default Paginator;
