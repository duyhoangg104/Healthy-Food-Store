import CartLink from "../header/CartLink";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Cart link", () => {
  it("should render cart button text", () => {
    // act(() => {
    //   render(<CartLink />, container);
    // });
    // expect(
    //   container.querySelector('[data-testid="cart-link__text"]').textContent
    // ).toBe("Giỏ hàng");
  });
});
