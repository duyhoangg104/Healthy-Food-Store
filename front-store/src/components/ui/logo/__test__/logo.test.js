import { render } from "@testing-library/react";
import Logo from "../index";
import { MemoryRouter } from "react-router-dom";

it("use correct logo image src", async () => {
  const { getByAltText } = await render(
    <MemoryRouter>
      <Logo />
    </MemoryRouter>
  );

  const image = getByAltText("main logo");

  expect(image.src).toContain("http://localhost/main_logo.png");
});
