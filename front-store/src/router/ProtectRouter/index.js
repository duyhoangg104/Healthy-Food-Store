import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const ProtectRouter = ({ children, ...props }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <Route {...props}>{children}</Route>;
};

export default ProtectRouter;
