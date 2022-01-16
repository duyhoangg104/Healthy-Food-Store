/** @format */

import React from "react";
import SectionTitle from "../../shared/SectionTitle";
import "./index.scss";
import { GiMeal } from "react-icons/gi";
import { IoLeafSharp } from "react-icons/io5";
import { FiCheckCircle } from "react-icons/fi";
import { GoClock } from "react-icons/go";

const Commitment = () => {
  return (
    <div className="commitment">
      <SectionTitle title="Cam kết" />
      <div className="items">
        <div className="item">
          <div className="icon">
            <GiMeal size={64} color="#509100" />
          </div>
          <div className="text text-center">
            <h5>Thực đơn đa dạng</h5>
            <p>
              HFS thường xuyên thay đổi thực đơn đa dạng, linh hoạt, các món đặc
              sắc và dễ lựa chọn
            </p>
          </div>
        </div>
        <div className="item">
          <div className="icon">
            <IoLeafSharp size={64} color="#509100" />
          </div>
          <div className="text text-center">
            <h5>Nguyên liệu sạch</h5>
            <p>
              Tất cả các loại nguyên liệu đều là thực phẩm sạch, chế biến đảm
              bảo vệ sinh an toàn thực phẩm.
            </p>
          </div>
        </div>
        <div className="item">
          <div className="icon">
            <FiCheckCircle size={64} color="#509100" />
          </div>
          <div className="text text-center">
            <h5>Khẩu phần ăn khoa học</h5>
            <p>
              Khẩu phần ăn được tính toán kỹ lưỡng lượng calories, đảm bảo chế
              độ ăn uống hợp lý.
            </p>
          </div>
        </div>
        <div className="item">
          <div className="icon">
            <GoClock size={64} color="#509100" />
          </div>
          <div className="text text-center">
            <h5>Giao hàng đúng giờ</h5>
            <p>
              Các phần ăn được chế biến nóng trong ngày, đảm bảo giao hàng đúng
              giờ, tận nơi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commitment;
