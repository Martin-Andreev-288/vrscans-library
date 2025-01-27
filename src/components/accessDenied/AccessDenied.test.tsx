import { render, screen } from "@testing-library/react";
import AccessDenied from "./AccessDenied";

describe("AccessDenied Component", () => {
  it("renders the default message when no message prop is provided", () => {
    render(<AccessDenied />);
    const messageElement = screen.getByText("Access denied for guest users.");
    expect(messageElement).toBeInTheDocument();
  });

  it("renders the custom message when a message prop is provided", () => {
    const customMessage = "You do not have permission to view this page.";
    render(<AccessDenied message={customMessage} />);
    const messageElement = screen.getByText(customMessage);
    expect(messageElement).toBeInTheDocument();
  });

  it("applies the correct classes for styling", () => {
    render(<AccessDenied />);
    const container = screen.getByText("Access denied for guest users.");
    expect(container).toHaveClass("text-2xl", "font-bold", "text-gray-600");
  });
});
