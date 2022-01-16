/** @format */

import React, { useEffect, lazy } from "react";
import "./index.scss";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideSidebar, showSidebar } from "../../store/slice/uiSlice";
import { AiOutlineMenuUnfold } from "react-icons/ai";

import LazyWrapper from "../../router/LazyWrapper";

const Backdrop = lazy(() => import("../../components/ui/backdrop"));
const AccountInfo = lazy(() => import("../../pages/manager/accountInfo"));
const WaitingOrders = lazy(() => import("../../pages/shipper/WaitingOrders"));
const ShippingOrders = lazy(() => import("../../pages/shipper/ShippingOrders"));
const ShipperHomePage = lazy(() => import("../../pages/shipper/HomePage"));
const ShippingHistory = lazy(() =>
  import("../../pages/shipper/ShippingHistory")
);
const NotFound = lazy(() => import("../../pages/global/404"));
const ShipperSidebar = lazy(() => import("../../components/shipper/sidebar"));

const ShipperLayout = () => {
  const { path } = useRouteMatch();
  const { sidebar } = useSelector((state) => state.ui);
  const { userInfo, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!!userInfo.role && userInfo.role.value !== "shipper") {
      history.push("/");
    }
  }, [userInfo]);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="dashboard-layout">
        <div className={`sidebar ${sidebar.isShow ? "show" : ""}`}>
          <LazyWrapper>
            <ShipperSidebar />
          </LazyWrapper>
        </div>
        <div className="main-content">
          <button
            className="btn-show__sidebar"
            onClick={() => dispatch(showSidebar())}
          >
            <AiOutlineMenuUnfold />
          </button>
          <Switch>
            <Route path={`${path}/account-info`}>
              <LazyWrapper>
                <AccountInfo />
              </LazyWrapper>
            </Route>
            <Route path={`${path}/order-waiting`}>
              <LazyWrapper>
                <WaitingOrders />
              </LazyWrapper>
            </Route>
            <Route path={`${path}/order-shipping`}>
              <LazyWrapper>
                <ShippingOrders />
              </LazyWrapper>
            </Route>
            <Route path={`${path}/order-history`}>
              <LazyWrapper>
                <ShippingHistory />
              </LazyWrapper>
            </Route>
            <Route path={`${path}`} exact>
              <LazyWrapper>
                <ShipperHomePage />
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
      <LazyWrapper>
        <Backdrop
          open={sidebar.isShow}
          onClicked={() => dispatch(hideSidebar())}
        />
      </LazyWrapper>
    </>
  );
};

export default ShipperLayout;
