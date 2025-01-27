import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader Component", () => {
  it("renders the loader container with correct classes", () => {
    render(<Loader />);
    const container = screen.getByRole("status");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(
      "absolute",
      "inset-0",
      "flex",
      "items-center",
      "justify-center",
      "bg-slate-200/20",
      "backdrop-blur-sm"
    );
  });
});
