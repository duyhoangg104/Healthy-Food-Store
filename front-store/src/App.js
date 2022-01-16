/** @format */

import React, { useEffect, lazy } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { useGetAuthUserDataQuery } from "./store/services/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "./store/slice/authSlice";

const Header = lazy(() => import("./components/shared/header"));
const Footer = lazy(() => import("./components/shared/footer"));
const Notification = lazy(() => import("./components/ui/notification"));
const Submenu = lazy(() => import("./components/shared/submenu"));

const AdminLayout = lazy(() => import("./layout/adminLayout"));
const GlobalLayout = lazy(() => import("./layout/globalLayout"));
const ManagerLayout = lazy(() => import("./layout/managerLayout"));
const EmployeeLayout = lazy(() => import("./layout/employeeLayout"));
const ShipperLayout = lazy(() => import("./layout/shipperLayout"));
const CustomerProfileLayout = lazy(() =>
  import("./layout/CustomerProfileLayout")
);

import { redirectUser } from "./utils/redirect";
import LazyWrapper from "./router/LazyWrapper";
import { activeClassName } from "./utils/helper";
import {
  autoLogoutWhenTokenExpired,
  checkTokenExpiration,
} from "./utils/timer";
import { getListRoleAction } from "./store/actions/role";
import FullScreenLoading from "./components/ui/fullScreenLoader";

const App = () => {
  const { isAuthenticated, userInfo, authData } = useSelector(
    (state) => state.auth
  );
  const { checkout } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();

  const { data, isLoading, error, isFetching } = useGetAuthUserDataQuery(null, {
    skip: !isAuthenticated,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data && isAuthenticated) {
      dispatch(setUserInfo(data));
    }
  }, [data, dispatch, error, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      redirectUser(userInfo, history);
    }
  }, [history, userInfo, isAuthenticated]);

  useEffect(() => {
    checkTokenExpiration(authData?.token, dispatch);
    autoLogoutWhenTokenExpired(authData?.token, dispatch, history);
  }, [authData?.token]);

  useEffect(() => {
    dispatch(getListRoleAction());
  }, []);

  if (isLoading || isFetching) {
    return <FullScreenLoading />;
  }

  return (
    <>
      <div
        className={`app-container ${activeClassName(
          checkout.isLoading,
          "divDisable divDisableWhite"
        )}`}
        data-testid="app-container"
      >
        <LazyWrapper>
          <Header isLoading={isLoading} />
        </LazyWrapper>
        <LazyWrapper>
          <Submenu />
        </LazyWrapper>
        <div className={`${isLoading || isFetching ? "py-5" : ""}`}>
          <Switch>
            <Route path="/admin">
              <LazyWrapper>
                <AdminLayout />
              </LazyWrapper>
            </Route>
            <Route path="/manager">
              <LazyWrapper>
                <ManagerLayout />
              </LazyWrapper>
            </Route>
            <Route path="/employee">
              <LazyWrapper>
                <EmployeeLayout />
              </LazyWrapper>
            </Route>
            <Route path="/shipper">
              <LazyWrapper>
                <ShipperLayout />
              </LazyWrapper>
            </Route>
            <Route path="/customer-profile">
              <LazyWrapper>
                <CustomerProfileLayout />
              </LazyWrapper>
            </Route>
            <Route path="/">
              <LazyWrapper>
                <GlobalLayout />
              </LazyWrapper>
            </Route>
            <Route>
              <Redirect to="/404" />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
      <LazyWrapper>
        <Notification />
      </LazyWrapper>
    </>
  );
};

export default App;
