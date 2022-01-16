/** @format */

import React, { Suspense } from "react";
import Loader from "../../components/ui/loader";

// eslint-disable-next-line react/prop-types
const LazyWrapper = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="my-5 py-5">
          <Loader />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default LazyWrapper;
