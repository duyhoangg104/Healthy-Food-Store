import { render } from "@testing-library/react";
import Loader from "../index";

it("use correct image src", async () => {
  const { getByAltText } = await render(<Loader />);

  const image = getByAltText("full screen loader");

  expect(image.src).toContain("http://localhost/loader.gif");
});
