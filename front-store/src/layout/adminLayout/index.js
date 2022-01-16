/** @format */

import React, { useEffect, lazy } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";

import LazyWrapper from "../../router/LazyWrapper";
import { hideSidebar, showSidebar } from "../../store/slice/uiSlice";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { getUsersAction } from "../../store/actions/admin";

const Backdrop = lazy(() => import("../../components/ui/backdrop"));
const AdminSidebar = lazy(() => import("../../components/admin/sidebar"));
const AdminHomePage = lazy(() => import("../../pages/admin/HomePage"));
const CreateAccount = lazy(() => import("../../pages/admin/CreateAccount"));
const EmployeeList = lazy(() => import("../../pages/admin/EmployeeList"));
const ManagerList = lazy(() => import("../../pages/admin/ManagerList"));
const ShipperList = lazy(() => import("../../pages/admin/ShipperList"));
const EditUserInfo = lazy(() => import("../../pages/admin/EditUserInfo"));
const NotFound = lazy(() => import("../../pages/global/404"));

const AdminLayout = () => {
  const { path } = useRouteMatch();
  const { sidebar } = useSelector((state) => state.ui);
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!!userInfo.role && userInfo.role.value !== "admin") {
      history.push("/");
    }
  }, [userInfo]);

  const onAdminSearchUsers = (nameQuery, role) => {
    dispatch(
      getUsersAction(
        `?role=${role}&nameQuery=${nameQuery.trim().toLowerCase()}`
      )
    );
  };

  return (
    <div className="dashboard-layout">
      <div className={`sidebar ${sidebar.isShow ? "show" : ""}`}>
        <LazyWrapper>
          <AdminSidebar />
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
          <Route path={`${path}`} exact>
            <LazyWrapper>
              <AdminHomePage />
            </LazyWrapper>
          </Route>
          <Route path={`${path}/new-account`}>
            <LazyWrapper>
              <CreateAccount />
            </LazyWrapper>
          </Route>
          <Route path={`${path}/employee`}>
            <LazyWrapper>
              <EmployeeList onSearchUsers={onAdminSearchUsers} />
            </LazyWrapper>
          </Route>
          <Route path={`${path}/manager`}>
            <LazyWrapper>
              <ManagerList onSearchUsers={onAdminSearchUsers} />
            </LazyWrapper>
          </Route>
          <Route path={`${path}/shipper`}>
            <LazyWrapper>
              <ShipperList onSearchUsers={onAdminSearchUsers} />
            </LazyWrapper>
          </Route>
          <Route path={`${path}/edit-user/:id`}>
            <LazyWrapper>
              <EditUserInfo />
            </LazyWrapper>
          </Route>
          <Route>
            <LazyWrapper>
              <NotFound />
            </LazyWrapper>
          </Route>
        </Switch>
      </div>
      <LazyWrapper>
        <Backdrop
          open={sidebar.isShow}
          onClicked={() => dispatch(hideSidebar())}
        />
      </LazyWrapper>
    </div>
  );
};

export default AdminLayout;
