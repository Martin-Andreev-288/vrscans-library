import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import Welcome from "./Welcome";

// Mock the image imports
vi.mock("../../assets/welcome-page-img-2.png", () => ({
  default: "test-welcome-img.png"
}));

vi.mock("../../assets/logo.png", () => ({
  default: "test-logo.png"
}));

describe("Welcome component", () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    );
  };

  describe("Visual elements", () => {
    it("renders the background image correctly", () => {
      const { container } = renderComponent();
      const backgroundDiv = container.firstChild as HTMLElement;
      expect(backgroundDiv).toHaveStyle("background-image: url(test-welcome-img.png)");
    });

    it("displays the main heading", () => {
      renderComponent();
      const heading = screen.getByRole("heading", {
        name: /VRScans Materials Library/i,
        level: 1
      });
      expect(heading).toBeInTheDocument();
    });

    it("shows the description text", () => {
      renderComponent();
      const description = screen.getByText(
        /An intuitive, React-powered application that dynamically fetches and displays VRScans materials/i
      );
      expect(description).toBeInTheDocument();
    });

    it("contains the CHAOSGROUP logo", () => {
      renderComponent();
      const logo = screen.getByAltText("CHAOSGROUP");
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("src", "test-logo.png");
    });
  });

  describe("Navigation links", () => {
    it("has a working login/signup link", () => {
      renderComponent();
      const loginLink = screen.getByRole("link", { name: /Login \/ Signup/i });
      expect(loginLink).toHaveAttribute("href", "/login");
    });

    it("has a working explore VRScans link", () => {
      renderComponent();
      const exploreLink = screen.getByRole("link", { name: /Explore VRScans/i });
      expect(exploreLink).toHaveAttribute("href", "/products");
    });
  });

  describe("Layout structure", () => {
    it("has properly styled main content container", () => {
      renderComponent();
      const mainContainer = screen.getByText(/VRScans Materials Library/i).parentElement;
      expect(mainContainer).toHaveClass("h-[70vh]");
      expect(mainContainer).toHaveClass("bg-opacity-70");
    });

    it("has a properly styled footer section", () => {
      renderComponent();
      const footer = screen.getByAltText("CHAOSGROUP").closest("div");
      expect(footer).toHaveClass("h-[10vh]");
      expect(footer).toHaveClass("w-[90vw]");
      expect(footer).toHaveClass("border-t-4");
    });
  });
});
