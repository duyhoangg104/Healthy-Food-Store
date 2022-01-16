import { render } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import LazyWrapper from "./router/LazyWrapper";

it("renders app container class", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <MemoryRouter>
        <LazyWrapper>
          <App />
        </LazyWrapper>
      </MemoryRouter>
    </Provider>
  );

  const appContainer = getByTestId("app-container");

  expect(appContainer.classList.contains("app-container")).toBe(true);
});
