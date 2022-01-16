/** @format */

import { addMultipleNoti, removeNoti, addNoti } from "../store/slice/uiSlice";

export const handleShowMultipleErrors = (errors, dispatch) => {
  const ids = [];
  dispatch(
    addMultipleNoti(
      errors.map((item, index) => {
        ids.push(`${index + 1}-${item.param}`);
        return {
          id: `${index + 1}-${item.param}`,
          type: "error",
          msg: item.msg,
        };
      })
    )
  );
  setTimeout(() => {
    ids.forEach((notiId) => {
      dispatch(removeNoti(notiId));
    });
  }, 3000);
};

export const handleShowNotification = (msg, type, dispatch) => {
  const notiId = Math.random().toString();
  dispatch(
    addNoti({
      id: notiId,
      type: type,
      msg: msg,
    })
  );
  setTimeout(() => {
    dispatch(removeNoti(notiId));
  }, 3000);
};
