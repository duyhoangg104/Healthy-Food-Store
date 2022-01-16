/** @format */

import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import SectionTitle from "../../shared/SectionTitle";
import suggestion1 from "../../../assets/images/suggest_1.png";
import suggestion2 from "../../../assets/images/suggest_2.png";
import suggestion3 from "../../../assets/images/suggest_3.png";

const Suggestion = () => {
  return (
    <div className="suggestion">
      <SectionTitle title="Gợi ý của chúng tôi" />
      <div className="container">
        <div className="items my-5">
          <div className="item">
            <Link to="/menu">
              <img src={suggestion1} alt="" />
            </Link>
          </div>
          <div className="item">
            <Link to="/menu">
              <img src={suggestion2} alt="" />
            </Link>
          </div>
          <div className="item">
            <Link to="/menu">
              <img src={suggestion3} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
