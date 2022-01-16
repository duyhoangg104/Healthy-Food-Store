/** @format */

import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import notFound from "../../assets/images/404.png";
import "./styles/404.scss";
import { useSelector } from "react-redux";

const NotFound = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [link, setLink] = useState("/");

  useEffect(() => {
    if (userInfo?.role?.value === "admin") {
      setLink("/admin");
    }
    if (userInfo?.role?.value === "manager") {
      setLink("/manager");
    }
    if (userInfo?.role?.value === "employee") {
      setLink("/employee");
    }
    if (userInfo?.role?.value === "shipper") {
      setLink("/shipper");
    }
  }, [userInfo]);

  return (
    <div className="not-found">
      <img src={notFound} alt="" />
      <Link to={link}>
        <AiOutlineArrowLeft /> Quay lại trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
