import React, { useState } from "react";
import PropTypes from "prop-types";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AiOutlineCalendar } from "react-icons/ai";
import ClickOusideWrapper from "../shared/ClickOusideWrapper";
import IconLoader from "../../components/ui/iconLoader";
import { activeClassName } from "../../utils/helper";

const FilterOrders = ({
  onFilterByDate,
  isLoading,
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
}) => {
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  return (
    <div className="filter-shipping__history mb-5">
      <div className="row">
        <div className="col-md-3">
          <p>Từ ngày</p>
          <div className="date-block">
            <div
              className="date start-date shadow-sm rounded"
              onClick={() => setShowStartDate(true)}
            >
              <span> {startDate?.toLocaleDateString()} </span>
              <span>
                <AiOutlineCalendar size={24} />
              </span>
            </div>
            <div className="abs-position">
              {showStartDate && (
                <ClickOusideWrapper callback={() => setShowStartDate(false)}>
                  <Calendar
                    onChange={(value) => {
                      onChangeStartDate(value);
                      setShowStartDate(false);
                    }}
                    value={startDate}
                    maxDate={endDate}
                    locale="vi"
                  />
                </ClickOusideWrapper>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-3 mt-3 mt-md-0">
          <p>Đến ngày</p>
          <div className="date-block">
            <div
              className="date end-date shadow-sm rounded"
              onClick={() => setShowEndDate(true)}
            >
              <span> {endDate?.toLocaleDateString()} </span>
              <span>
                <AiOutlineCalendar size={24} />
              </span>
            </div>
            <div className="abs-position">
              {showEndDate && (
                <ClickOusideWrapper callback={() => setShowEndDate(false)}>
                  <Calendar
                    onChange={(value) => {
                      onChangeEndDate(value);
                      setShowEndDate(false);
                    }}
                    value={endDate}
                    maxDate={new Date()}
                    minDate={startDate}
                    locale="vi"
                  />
                </ClickOusideWrapper>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <p className="invisible">Search</p>
          <button
            className={`btn-green mt-1 ${activeClassName(
              isLoading,
              "divDisable divDisableWhite"
            )}`}
            onClick={onFilterByDate}
          >
            {isLoading && <IconLoader />} TÌM KIẾM
          </button>
        </div>
      </div>
    </div>
  );
};

FilterOrders.propTypes = {
  onFilterByDate: PropTypes.func,
  isLoading: PropTypes.bool,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  onChangeStartDate: PropTypes.func,
  onChangeEndDate: PropTypes.func,
};

export default FilterOrders;
