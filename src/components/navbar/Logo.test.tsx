import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import Logo from "./Logo";

vi.mock("/src/assets/logo.png", () => ({
  default: "test-logo.png"
}));

describe("Logo Component", () => {
  it("renders logo image with correct link", () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    const img = screen.getByRole("img");

    expect(link).toHaveAttribute("href", "/products");
    expect(img).toHaveAttribute("src", "test-logo.png");
    expect(img).toHaveAttribute("alt", "WorldWise logo");
  });
});
