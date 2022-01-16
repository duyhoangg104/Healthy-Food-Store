import { render } from "@testing-library/react";
import Paginator from "../paginator";

it("should show emty string", () => {
  const { container } = render(<Paginator isLoading />);
  expect(container.innerHTML).toBe("");
});
