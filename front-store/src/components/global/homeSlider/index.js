/** @format */

import React from "react";
import "./index.scss";
import sliderImg from "../../../assets/images/slide.png";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

const HomeSlider = () => {
  return (
    <div className="home-slider">
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={sliderImg} className="d-block w-100" alt={sliderImg} />
          </div>
          <div className="carousel-item">
            <img src={sliderImg} className="d-block w-100" alt={sliderImg} />
          </div>
          <div className="carousel-item">
            <img src={sliderImg} className="d-block w-100" alt={sliderImg} />
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
          <span className="visually-hidden">Previois</span>
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
    </div>
  );
};

export default HomeSlider;
