/** @format */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./index.scss";
import facebookIcon from "../../../assets/images/facebook_icon.png";
import instagramIcon from "../../../assets/images/instagram_icon.png";
import certificateBct from "../../../assets/images/certificate_bct.png";
import certificate from "../../../assets/images/certificate.png";

const Footer = () => {
  const [isShowFooter, setIsShowFooter] = useState(true);
  const { pathname } = useLocation();
  useEffect(() => {
    if (
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/verify-email" ||
      pathname === "/reset-password" ||
      pathname.includes("/admin") ||
      pathname.includes("/manager") ||
      pathname.includes("/employee") ||
      pathname.includes("/shipper") ||
      pathname.includes("/confirm-register")
    ) {
      setIsShowFooter(false);
    } else {
      setIsShowFooter(true);
    }
  }, [pathname]);
  return (
    <div className={`main-footer ${isShowFooter ? "" : "d-none"}`}>
      <div className="social py-3 border-bottom">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <h3 className="mb-0">Follow us on social network</h3>
            <ul className="d-flex align-items-center justify-content-between">
              <li className="me-3">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <img src={facebookIcon} alt="" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={instagramIcon} alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="shop-info py-5">
        <div className="container">
          <div className="page-title mb-5">
            <h1>STORE INFORMATION</h1>
          </div>
          <div className="row text-center">
            <div className="col-md-6 col-lg-4 mt-3 mt-lg-0">
              <h5>HEALTHY FOOD STORE</h5>
              <ul>
                <li>123 Hoan Kiem District, Ha Noi City, Vietnam</li>
                <li>Tel: +84 234 56789</li>
                <li>Hotline: +84 (0) 909 123 456</li>
                <li>hanoi@healthyfoodstore.net</li>
                <li>Certificate of business registration : 0303030303</li>
                <li>Issued: 06/09/2021 in Ha Noi City</li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-4 mt-3 mt-lg-0">
              <ul>
                <li>Privacy and Data Protection</li>
                <li>Terms and conditions of use</li>
                <li>Delivery & Return Policy</li>
                <li>Secure Payment</li>
                <li>FAQ</li>
                <li>Contact us</li>
                <li className="my-3">
                  <img src={certificateBct} alt="" />
                </li>
                <li>© 2021 - Healthy Food Store</li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-4 align-self-center mt-3 mt-lg-0">
              <ul className="d-flex justify-content-center">
                <li>
                  <div className="certificate-bg">
                    <img src={certificate} alt="" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
