/** @format */

import React from "react";
import "./styles/homepage.scss";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import TopBanners from "../../components/global/topBanners";
import Commitment from "../../components/global/Commitment";
import Suggestion from "../../components/global/Suggestion";
import AppSuggestion from "../../components/global/AppSuggestion";
import BottomBanner from "../../components/global/bottomBanner";

const HomePage = () => {
  useDocumentTitle("Trang chủ");

  return (
    <div className="homepage">
      <TopBanners />
      <Commitment />
      <Suggestion />
      <AppSuggestion />
      <BottomBanner />
    </div>
  );
};

export default HomePage;
