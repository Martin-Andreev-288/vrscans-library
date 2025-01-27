import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DefaultInput from "./DefaultInput";

describe("DefaultInput Component", () => {
  // Basic rendering and props
  it("renders label and input with correct attributes", () => {
    const props = {
      type: "text",
      name: "username",
      placeholder: "Enter your username"
    };

    render(<DefaultInput {...props} />);

    const label = screen.getByText(props.name);
    const input = screen.getByRole("textbox");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", props.type);
    expect(input).toHaveAttribute("name", props.name);
    expect(input).toHaveAttribute("placeholder", props.placeholder);
  });

  // Label text scenarios
  it("displays custom label text when labeltext prop is provided", () => {
    const labeltext = "Custom Label";
    render(
      <DefaultInput
        type="text"
        name="username"
        placeholder="Enter username"
        labeltext={labeltext}
      />
    );

    expect(screen.getByText(labeltext)).toBeInTheDocument();
  });

  it("uses name prop as label text when labeltext is not provided", () => {
    const name = "userEmail";
    render(<DefaultInput type="email" name={name} placeholder="Enter email" />);

    expect(screen.getByText(name)).toBeInTheDocument();
  });

  // Default value handling
  it("applies defaultValue to input", () => {
    const defaultValue = "test@example.com";
    render(
      <DefaultInput
        type="email"
        name="email"
        placeholder="Enter email"
        defaultValue={defaultValue}
      />
    );

    expect(screen.getByDisplayValue(defaultValue)).toBeInTheDocument();
  });

  it("associates label with input correctly", () => {
    const name = "password";
    render(<DefaultInput type="password" name={name} placeholder="Enter password" />);

    // Get input by its associated label text
    const input = screen.getByLabelText(name);
    const label = screen.getByText(name);

    // Verify attributes
    expect(label).toHaveAttribute("for", name);
    expect(input).toHaveAttribute("id", name);
  });

  // Style classes
  it("applies correct CSS classes to input", () => {
    render(<DefaultInput type="text" name="test" placeholder="Test" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("w-full h-[6vh] max-h-12 min-h-9 bg-transparent");
  });
});
