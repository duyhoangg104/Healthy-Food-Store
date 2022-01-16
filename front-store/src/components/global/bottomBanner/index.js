/** @format */

import React from "react";
import "./index.scss";
import bottomBanner from "../../../assets/images/bottomBanner.png";

const BottomBanner = () => {
  return (
    <div className="">
      <div className="bottom-banner mt-5 px-0 px-md-5">
        <img src={bottomBanner} alt="" />
        <div className="text">
          <h3>HFS giới thiệu Cửa hàng thực phẩm lành mạnh</h3>
          <div>
            <p>
              &quote;Chúng tôi chọn lọc những sản phẩm thực phẩm và đồ uống tốt
              nhất và mang chúng đến bảng của bạn&quote; <br />
              Kể từ năm 2005, HFS là nhà cung cấp thực phẩm và đồ uống ưa thích
              cho tất cả Khách sạn 4 & 5 sao
              <br />
              và các nhà hàng được đánh giá cao tại Việt Nam. Bây giờ chúng tôi
              ra mắt Cửa hàng thực phẩm lành mạnh, thương mại điện tử hiện đại
              của chúng tôi nền tảng. <br />
              Bằng cách mua sắm ở đây, bạn sẽ có thể truy cập vào một loạt các
              các sản phẩm thực phẩm và đồ uống cao cấp. <br />
              Vui lòng nhấp chuột và đặt hàng lựa chọn sản phẩm của bạn, chúng
              tôi giao hàng tận nơi cho bạn cửa !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
