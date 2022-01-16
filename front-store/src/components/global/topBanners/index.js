/** @format */

import React from "react";
import { useHistory } from "react-router-dom";
import topBanner1Img from "../../../assets/images/top-banner-5.jpg";
import topBanner2Img from "../../../assets/images/top-banner-2.gif";
import topBanner3Img from "../../../assets/images/top-banner-3.gif";
import topBanner4Img from "../../../assets/images/top-banner-4.jpg";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import "./index.scss";

const TopBanners = () => {
  const history = useHistory();
  return (
    <div className="home-slider top-banners mt-4 mb-3">
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={topBanner1Img}
              className="d-block w-100"
              alt={topBanner1Img}
            />
          </div>
          <div className="carousel-item">
            <img
              src={topBanner2Img}
              className="d-block w-100"
              alt={topBanner2Img}
            />
          </div>
          <div className="carousel-item">
            <img
              src={topBanner3Img}
              className="d-block w-100"
              alt={topBanner3Img}
            />
          </div>
          <div className="carousel-item">
            <img
              src={topBanner4Img}
              className="d-block w-100"
              alt={topBanner4Img}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true">
            <BsArrowLeftShort size={48} />
          </span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true">
            <BsArrowRightShort size={48} />
          </span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <button className="btn-centering" onClick={() => history.push("/menu")}>
        Mua ngay
      </button>
    </div>
  );
};

export default TopBanners;
