/** @format */

import React from "react";
import "./index.scss";
import { IoMdLock } from "react-icons/io";
import { AiTwotoneLike } from "react-icons/ai";
import { FaRegHandshake, FaTruckMoving } from "react-icons/fa";

const ShowCase = () => {
  return (
    <div className="showcase">
      <div className="item">
        <div className="icon">
          <IoMdLock size={48} />
        </div>
        <div className="text">
          <h3>Secured payment</h3>
          <p>Bank transfer or cash- on-delivery payments</p>
        </div>
      </div>
      <div className="item">
        <div className="icon">
          <AiTwotoneLike size={48} />
        </div>
        <div className="text">
          <h3>Quality products</h3>
          <p>Only the best products from all the world</p>
        </div>
      </div>
      <div className="item">
        <div className="icon">
          <FaRegHandshake size={48} />
        </div>
        <div className="text">
          <h3>Quick deals</h3>
          <p>Promo Codes and sales all year long</p>
        </div>
      </div>
      <div className="item">
        <div className="icon">
          <FaTruckMoving size={48} />
        </div>
        <div className="text">
          <h3>Fast delivery</h3>
          <p>Order now, delivery less than 30 minutes</p>
        </div>
      </div>
    </div>
  );
};

export default ShowCase;
