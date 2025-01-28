import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  // Basic rendering and children
  it("renders button with children content", () => {
    const buttonText = "Click Me";
    render(<Button type="navButton">{buttonText}</Button>);

    expect(screen.getByRole("button", { name: buttonText })).toBeInTheDocument();
  });

  // Click handler test
  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(
      <Button type="navButton" onClick={handleClick}>
        Test
      </Button>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Button type styles
  const typeTestCases = [
    {
      type: "navButton",
      expectedClasses: ["bg-black", "rounded-full", "px-4", "py-2", "hover:bg-green"]
    },
    {
      type: "welcomeButton",
      expectedClasses: [
        "border-black",
        "rounded-full",
        "bg-white",
        "py-3",
        "px-5",
        "hover:bg-body-color"
      ]
    },
    {
      type: "logInButton",
      expectedClasses: ["w-full", "rounded-md", "bg-black", "px-5", "py-3", "hover:bg-opacity-90"]
    }
    // Add similar entries for other button types
  ];

  typeTestCases.forEach(({ type, expectedClasses }) => {
    it(`applies correct styles for ${type} type`, () => {
      render(<Button type={type as any}>Test</Button>);
      const button = screen.getByRole("button");

      expectedClasses.forEach((className) => {
        expect(button).toHaveClass(className);
      });
    });
  });
});
