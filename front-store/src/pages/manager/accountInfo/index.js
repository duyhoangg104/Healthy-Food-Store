/** @format */

import React from "react";
import Submenu from "./Submenu";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ViewInfo from "./ViewInfo";
import EditInfo from "./EditInfo";
import ChangePassword from "./ChangePassword";
import useDocumentTitle from "../../../hooks/useDocumentTitle";

const AccountInfo = () => {
  useDocumentTitle("Tài khoản");
  const { path } = useRouteMatch();
  return (
    <div>
      <div className="page-title">
        <h1>THÔNG TIN</h1>
      </div>
      <Submenu />
      <Switch>
        <Route path={`${path}/edit`} component={EditInfo} />
        <Route path={`${path}/password`} component={ChangePassword} />
        <Route path={`${path}`} exact component={ViewInfo} />
      </Switch>
    </div>
  );
};

export default AccountInfo;
