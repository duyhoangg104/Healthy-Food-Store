import React, { useState } from "react";
import PropTypes from "prop-types";
import "./index.scss";
import {
  numberFormatter,
  formatter,
  activeClassName,
} from "../../../utils/helper";
import { createMealRequest } from "../../../store/api";
import IconLoader from "../../../components/ui/iconLoader";
import { useDispatch } from "react-redux";
import { handleShowNotification } from "../../../utils/event";
import {
  removeProductFromMealList,
  resetComboList,
  setMealData,
} from "../../../store/slice/mealSlice";
import OverCalorWarningModal from "./OverCalorWarningModal";
import { FaTimes } from "react-icons/fa";

const Summary = ({
  list,
  refetchMealData,
  setAllowCreateNewMeal,
  maxCalor,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const totalCalor = list.reduce((acc, cur) => acc + cur.calor * cur.qty, 0);

  const handleCreateMeal = async () => {
    setIsLoading(true);
    try {
      const { data } = await createMealRequest({
        title,
        products: list.map((item) => ({
          product: item._id,
          qty: item.qty,
        })),
      });
      dispatch(setMealData(data.meal));
      handleShowNotification(data.msg, "success", dispatch);
      setAllowCreateNewMeal(false);
      dispatch(resetComboList());
      refetchMealData();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkOverCalor = () => {
    if (totalCalor > maxCalor) {
      setIsOpen(true);
      return;
    }
    handleCreateMeal();
  };

  return (
    <div className="meal-summary">
      <div className="kcal-summary text-center">
        <div className="mb-4">
          <p className="text-danger">Khẩu phần ăn đã chọn</p>
          <p className="text-green mb-1">Tổng kcal</p>
          <strong>{numberFormatter.format(totalCalor)}</strong>
        </div>
        <div>
          <p className="text-green mb-1">Tổng giá thành</p>
          <strong>
            {formatter.format(
              list.reduce((acc, cur) => acc + cur.price * cur.qty, 0)
            )}
          </strong>
        </div>
      </div>
      <div className="products-summary">
        <div className="list-meal">
          {list?.map((item) => (
            <div key={item._id} className="meal-item">
              <img src={item.imageUrl} alt={item.title} />
              <div>
                <p>
                  {item.title?.substr(0, 18)}
                  {item.title?.length > 18 ? "..." : ""}
                </p>
                <button
                  className="delete-meal__item"
                  onClick={() => dispatch(removeProductFromMealList(item._id))}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="form mb-0">
          <div className="input-container mb-0">
            <input
              type="text"
              className="input-item"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tiêu đề"
              maxLength={32}
            />
          </div>
        </div>
        <button
          className={`btn-white d-block mx-auto mt-4 ${activeClassName(
            list.length === 0 || isLoading || !title.trim(),
            "divDisable"
          )}`}
          onClick={checkOverCalor}
        >
          {isLoading && <IconLoader />} Tạo khẩu phần ăn
        </button>
      </div>
      <OverCalorWarningModal
        open={isOpen}
        isLoading={isLoading}
        close={handleCreateMeal}
        onConfirm={() => setIsOpen(false)}
      />
    </div>
  );
};

Summary.propTypes = {
  list: PropTypes.array,
  refetchMealData: PropTypes.func,
  setAllowCreateNewMeal: PropTypes.func,
  maxCalor: PropTypes.number,
};

export default Summary;
