import React from "react";
import "./index.scss";
import PropTypes from "prop-types";
import Loader from "../../../components/ui/loader";
import { useMediaQuery } from "react-responsive";

const CategorySelection = ({
  categories,
  isLoading,
  selectedCategory,
  setSelectedCategory,
}) => {
  const isSmallMobile = useMediaQuery({ maxWidth: 500 });

  if (isLoading) {
    return (
      <div className="category-selection">
        <Loader />
      </div>
    );
  }
  return (
    <ul className="category-selection">
      {categories?.map((category) => (
        <li
          key={category._id}
          className={`${selectedCategory === category._id ? "active" : ""}`}
          onClick={() => setSelectedCategory(category._id)}
        >
          {isSmallMobile ? "" : "Chọn"} {category.title}
        </li>
      ))}
    </ul>
  );
};

CategorySelection.propTypes = {
  categories: PropTypes.array,
  isLoading: PropTypes.bool,
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func,
};

export default CategorySelection;
