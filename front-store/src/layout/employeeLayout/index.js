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
const Orders = lazy(() => import("../../pages/employee/Orders"));
const EmployeeHomePage = lazy(() => import("../../pages/employee/HomePage"));
const OrderInvoicePrint = lazy(() =>
  import("../../pages/employee/OrderInvoicePrint")
);
const NotFound = lazy(() => import("../../pages/global/404"));
const EmployeeSidebar = lazy(() => import("../../components/employee/sidebar"));

const EmployeeLayout = () => {
  const { path } = useRouteMatch();
  const { sidebar } = useSelector((state) => state.ui);
  const { userInfo, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!!userInfo.role && userInfo.role.value !== "employee") {
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
            <EmployeeSidebar />
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
            <Route path={`${path}/orders`}>
              <LazyWrapper>
                <Orders />
              </LazyWrapper>
            </Route>
            <Route path={`${path}/print-order/:id`}>
              <LazyWrapper>
                <OrderInvoicePrint />
              </LazyWrapper>
            </Route>
            <Route path={`${path}`} exact>
              <LazyWrapper>
                <EmployeeHomePage />
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

export default EmployeeLayout;
