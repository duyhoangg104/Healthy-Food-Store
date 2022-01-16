/** @format */

import React, { lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import { store } from "./store";
import { Provider } from "react-redux";
import LazyWrapper from "./router/LazyWrapper";

const App = lazy(() => import("./App"));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LazyWrapper>
          <App />
        </LazyWrapper>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
