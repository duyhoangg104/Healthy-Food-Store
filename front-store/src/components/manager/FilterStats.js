import React, { useState } from "react";
import PropTypes from "prop-types";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { useGetEmployeeListQuery } from "../../store/services/users";
import ClickOusideWrapper from "../shared/ClickOusideWrapper";
import "./index.scss";

const FilterStats = ({
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
  employeeId,
  setEmployeeId,
  onFilter,
}) => {
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const { data } = useGetEmployeeListQuery(null, {
    refetchOnReconnect: true,
  });

  return (
    <div className="manager-stats__filter mb-5">
      <div className="row mb-3">
        <div className="col-md-3 col-6">
          <p className="mt-3">Từ ngày</p>
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
                    maxDate={endDate || new Date()}
                    locale="vi"
                  />
                </ClickOusideWrapper>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <p className="mt-3">Đến ngày</p>
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
                    locale="vi"
                  />
                </ClickOusideWrapper>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <p className="mt-3">Nhân viên</p>
          <div className="select-block">
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            >
              <option value="">Vui lòng chọn</option>
              {data?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.fullName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <p className="invisible mt-3">Search</p>
          <button className="btn-green" onClick={onFilter}>
            TÌM KIẾM
          </button>
        </div>
      </div>
    </div>
  );
};

FilterStats.propTypes = {
  onFilter: PropTypes.func,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  onChangeStartDate: PropTypes.func,
  onChangeEndDate: PropTypes.func,
  employeeId: PropTypes.string,
  setEmployeeId: PropTypes.func,
};

export default FilterStats;
