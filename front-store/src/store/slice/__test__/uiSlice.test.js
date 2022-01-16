import reducer, {
  addNoti,
  initialState,
  toggleSidebar,
  removeNoti,
} from "../uiSlice";

test("should return initial state", () => {
  expect(reducer(undefined, { type: "@INIT" })).toEqual(initialState);
});

test("should handle sidebar show state", () => {
  const prevState = { ...initialState };
  expect(reducer(prevState, toggleSidebar)).toEqual({
    ...prevState,
    sidebar: {
      isShow: !prevState.sidebar.isShow,
    },
  });
});

test("should add new noti item to the list", () => {
  const prevState = {
    ...initialState,
    notifications: [
      {
        id: "1",
        type: "success",
        message: "Successfully message",
      },
    ],
  };
  expect(
    reducer(
      prevState,
      addNoti({
        id: "2",
        type: "success",
        message: "Successfully message 2",
      })
    )
  ).toEqual({
    ...prevState,
    notifications: [
      ...prevState.notifications,
      {
        id: "2",
        type: "success",
        message: "Successfully message 2",
      },
    ],
  });
});

test("should remove noti from the list", () => {
  const prevState = {
    ...initialState,
    notifications: [
      {
        id: "1",
        type: "success",
        message: "Successfully message",
      },
    ],
  };
  expect(reducer(prevState, removeNoti("1"))).toEqual({
    ...prevState,
    notifications: [],
  });
});
