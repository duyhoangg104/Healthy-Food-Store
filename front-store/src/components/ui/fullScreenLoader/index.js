import React from "react";
import "./index.scss";
import iconLoader from "../../../assets/animate/loader.gif";

const FullScreenLoading = () => {
  return (
    <div className="full-screen__loading">
      <img src={iconLoader} alt="full screen loader" />
    </div>
  );
};

export default FullScreenLoading;
