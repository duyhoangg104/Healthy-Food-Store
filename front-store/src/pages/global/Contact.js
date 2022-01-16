/** @format */

import React from "react";
import MapBox from "../../components/global/MapBox";

const Contact = () => {
  return (
    <div className="my-5">
      <MapBox lat={20.9916203} lng={105.8209792} zoom={15} />
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-sm-6">
            <div className="text-center">
              <h3>Địa chỉ</h3>
              <p className="lead">
                HEALTHY FOOD STORE <br /> 123 Hoan Kiem District, Ha Noi City
                Vietnam
              </p>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="text-center">
              <h3>Liên lạc</h3>
              <p className="lead">
                Tel: +84 234 56789 <br />
                Hotline: +84 (0) 909 123 456 <br />
                hanoi@healthyfoodstore.net
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
