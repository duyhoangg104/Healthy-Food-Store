/** @format */

import React, { useEffect, lazy } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";

import LazyWrapper from "../../router/LazyWrapper";
import { getMyTdeeDataAction } from "../../store/actions/tdee";
import {
  activeClassName,
  convertProfilePageTitleToVietnamese,
} from "../../utils/helper";

const CustomerProfile = lazy(() =>
  import("../../pages/profiles/CustomerProfile")
);
const OrderHistory = lazy(() => import("../../pages/profiles/OrderHistory"));
const ChangePassword = lazy(() =>
  import("../../pages/manager/accountInfo/ChangePassword")
);
const CalcTDEE = lazy(() => import("../../pages/global/CalcTDEE"));
const NotFound = lazy(() => import("../../pages/global/404"));

const CustomerProfileLayout = () => {
  const { path } = useRouteMatch();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const customerProfilePathname = pathname.replace("/customer-profile/", "");

  useEffect(() => {
    if (isAuthenticated && userInfo?.role?.value === "customer") {
      dispatch(getMyTdeeDataAction());
    }
  }, [isAuthenticated, userInfo]);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="profiles-layout">
      <div
        className={`page-title ${activeClassName(
          customerProfilePathname === "tdee",
          "d-none"
        )}`}
      >
        <h1 className="text-green-sm">
          {convertProfilePageTitleToVietnamese(customerProfilePathname)}
        </h1>
      </div>
      <div className="container my-5 pb-5">
        <Switch>
          <Route path={`${path}/profile`}>
            <LazyWrapper>
              <CustomerProfile />
            </LazyWrapper>
          </Route>
          <Route path={`${path}/password`}>
            <LazyWrapper>
              <ChangePassword
                btnText="Lưu thay đổi"
                wrapperClass="customer-password"
              />
            </LazyWrapper>
          </Route>
          <Route path={`${path}/tdee`}>
            <LazyWrapper>
              <CalcTDEE />
            </LazyWrapper>
          </Route>
          <Route path={`${path}/orders`}>
            <LazyWrapper>
              <OrderHistory />
            </LazyWrapper>
          </Route>
          <Route>
            <LazyWrapper>
              <NotFound />
            </LazyWrapper>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default CustomerProfileLayout;
