/** @format */

import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function useOutsideHandler(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

function ClickOusideWrapper(props) {
  const wrapperRef = useRef(null);

  useOutsideHandler(wrapperRef, props.callback);

  return <div ref={wrapperRef}>{props.children}</div>;
}

ClickOusideWrapper.propTypes = {
  callback: PropTypes.func,
  children: PropTypes.object,
};
export default ClickOusideWrapper;
