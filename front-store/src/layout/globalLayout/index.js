/** @format */

import React, { useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import OrderThank from "../../pages/global/OrderThank";
import LazyWrapper from "../../router/LazyWrapper";
import ProtectRouter from "../../router/ProtectRouter";
import { getMyTdeeDataAction } from "../../store/actions/tdee";

const NotFound = lazy(() => import("../../pages/global/404"));
const CalcTDEE = lazy(() => import("../../pages/global/CalcTDEE"));
const MealSuggestion = lazy(() => import("../../pages/global/MealSuggestion"));
const Cart = lazy(() => import("../../pages/global/Cart"));
const Contact = lazy(() => import("../../pages/global/Contact"));
const HomePage = lazy(() => import("../../pages/global/HomePage"));
const Login = lazy(() => import("../../pages/global/Login"));
const Menu = lazy(() => import("../../pages/global/menu"));
const Register = lazy(() => import("../../pages/global/Register"));
const ConfirmRegister = lazy(() =>
  import("../../pages/global/ConfirmRegister")
);
const ResetPassword = lazy(() => import("../../pages/global/ResetPassword"));
const VerifyEmail = lazy(() => import("../../pages/global/VerifyEmail"));
const WishList = lazy(() => import("../../pages/global/WishList"));
const Checkout = lazy(() => import("../../pages/global/Checkout"));
const Faq = lazy(() => import("../../pages/global/Faq"));

const GlobalLayout = () => {
  const { path } = useRouteMatch();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && userInfo?.role?.value === "customer") {
      dispatch(getMyTdeeDataAction());
    }
  }, [isAuthenticated, userInfo]);

  return (
    <Switch>
      <Route path={`${path}`} exact>
        <LazyWrapper>
          <HomePage />
        </LazyWrapper>
      </Route>
      <Route path={`${path}login`}>
        <LazyWrapper>
          <Login />
        </LazyWrapper>
      </Route>
      <Route path={`${path}register`}>
        <LazyWrapper>
          <Register />
        </LazyWrapper>
      </Route>
      <Route path={`${path}confirm-register`}>
        <LazyWrapper>
          <ConfirmRegister />
        </LazyWrapper>
      </Route>
      <Route path={`${path}404`}>
        <LazyWrapper>
          <NotFound />
        </LazyWrapper>
      </Route>
      <Route path={`${path}verify-email`}>
        <LazyWrapper>
          <VerifyEmail />
        </LazyWrapper>
      </Route>
      <Route path={`${path}reset-password`}>
        <LazyWrapper>
          <ResetPassword />
        </LazyWrapper>
      </Route>
      <Route path={`${path}cart`}>
        <LazyWrapper>
          <Cart />
        </LazyWrapper>
      </Route>
      <Route path={`${path}menu`}>
        <LazyWrapper>
          <Menu />
        </LazyWrapper>
      </Route>
      <Route path={`${path}contact`}>
        <LazyWrapper>
          <Contact />
        </LazyWrapper>
      </Route>
      <Route path={`${path}ttde-calc`}>
        <LazyWrapper>
          <CalcTDEE />
        </LazyWrapper>
      </Route>
      <Route path={`${path}meal`}>
        <LazyWrapper>
          <MealSuggestion />
        </LazyWrapper>
      </Route>
      <Route path={`${path}wish-list`}>
        <LazyWrapper>
          <WishList />
        </LazyWrapper>
      </Route>
      <Route path={`${path}order-thanks`}>
        <LazyWrapper>
          <OrderThank />
        </LazyWrapper>
      </Route>
      <ProtectRouter path={`${path}checkout`}>
        <LazyWrapper>
          <Checkout />
        </LazyWrapper>
      </ProtectRouter>
      <Route path={`${path}faq`}>
        <LazyWrapper>
          <Faq />
        </LazyWrapper>
      </Route>
      <Route>
        <LazyWrapper>
          <NotFound />
        </LazyWrapper>
      </Route>
    </Switch>
  );
};

export default GlobalLayout;
