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
const NewDish = lazy(() => import("../../pages/manager/NewDish"));
const Products = lazy(() => import("../../pages/manager/Products"));
const Categories = lazy(() => import("../../pages/manager/Categories"));
const Customers = lazy(() => import("../../pages/manager/Customers"));
const CustomerDetail = lazy(() => import("../../pages/manager/CustomerDetail"));
const Report = lazy(() => import("../../pages/manager/Report"));
const EditDish = lazy(() => import("../../pages/manager/EditDish"));
const CouponList = lazy(() => import("../../pages/manager/CouponList"));
const ManagerHomePage = lazy(() => import("../../pages/manager/HomePage"));
const NotFound = lazy(() => import("../../pages/global/404"));
const ManagerSidebar = lazy(() => import("../../components/manager/sidebar"));

const ManagerLayout = () => {
  const { path } = useRouteMatch();
  const { sidebar } = useSelector((state) => state.ui);
  const { userInfo, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!!userInfo.role && userInfo.role.value !== "manager") {
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
            <ManagerSidebar />
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
            <Route path={`${path}/products`}>
              <LazyWrapper>
                <Products />
              </LazyWrapper>
            </Route>
            <Route path={`${path}/categories`}>
              <LazyWrapper>
                <Categories />
              </LazyWrapper>
            </Route>
            <Route path={`${path}/new-product`}>
              <LazyWrapper>
                <NewDish />
              </LazyWrapper>
            </Route>
            <Route path={`${path}/edit-product/:id`}>
              <LazyWrapper>
                <EditDish />
              </LazyWrapper>
            </Route>
            <Route path={`${path}/customers`}>
              <LazyWrapper>
                <Customers />
              </LazyWrapper>
            </Route>
            <Route path={`${path}/coupons`}>
              <LazyWrapper>
                <CouponList />
              </LazyWrapper>
            </Route>
            <Route path={`${path}/stats`}>
              <LazyWrapper>
                <Report />
              </LazyWrapper>
            </Route>
            <Route path={`${path}/customer-info/:id`}>
              <LazyWrapper>
                <CustomerDetail />
              </LazyWrapper>
            </Route>
            <Route path={`${path}`} exact>
              <LazyWrapper>
                <ManagerHomePage />
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

export default ManagerLayout;
