import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";
import SignUp, { action } from "./SignUp";
import { apiClient } from "../../utils/apiClient";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse } from "axios";

vi.mock("../../utils/apiClient");

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

vi.mock("../../components/defaultInput/DefaultInput", () => ({
  default: ({ type, name, placeholder }: any) => (
    <input type={type} name={name} placeholder={placeholder} data-testid={name} />
  )
}));

vi.mock("../../components/button/Button", () => ({
  default: ({ children }: any) => <button>{children}</button>
}));

vi.mock("../../assets/logo.png", () => ({ default: "logo.png" }));
vi.mock("../../assets/sign-in-img.png", () => ({ default: "sign-in-img.png" }));

describe("SignUp Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    const router = createMemoryRouter(
      [
        {
          path: "/signup",
          element: <SignUp />,
          action: action
        }
      ],
      {
        initialEntries: ["/signup"]
      }
    );

    return render(<RouterProvider router={router} />);
  };

  describe("Rendering", () => {
    it("displays the logo and main image", () => {
      renderComponent();
      expect(screen.getByAltText("Chaosgroup Logo")).toBeInTheDocument();
      expect(screen.getByAltText("VR Scan Image")).toBeInTheDocument();
    });

    it("shows the registration form with all inputs", () => {
      renderComponent();
      expect(screen.getByTestId("username")).toBeInTheDocument();
      expect(screen.getByTestId("email")).toBeInTheDocument();
      expect(screen.getByTestId("password")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
    });

    it("displays the login link", () => {
      renderComponent();
      expect(screen.getByText("Already a member?")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute("href", "/login");
    });
  });

  describe("Form Submission", () => {
    it("handles successful registration", async () => {
      (apiClient.post as Mock).mockResolvedValueOnce({});

      const formData = new FormData();
      formData.append("username", "testuser");
      formData.append("email", "test@example.com");
      formData.append("password", "password123");

      await action({
        request: { formData: () => Promise.resolve(formData) }
      } as any);

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith("Successful registration", {
          autoClose: 2000
        });
        expect(apiClient.post).toHaveBeenCalledWith("/register", {
          username: "testuser",
          email: "test@example.com",
          password: "password123"
        });
      });
    });

    it("handles registration error", async () => {
      const error = new AxiosError("Test error", "400", undefined, undefined, {
        data: { error: { message: "Test error" } },
        status: 400,
        statusText: "Bad Request",
        headers: {},
        config: {}
      } as AxiosResponse);

      (apiClient.post as Mock).mockRejectedValueOnce(error);

      const formData = new FormData();
      formData.append("username", "testuser");
      formData.append("email", "test@example.com");
      formData.append("password", "password123");

      await action({
        request: { formData: () => Promise.resolve(formData) }
      } as any);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("Test error");
      });
    });

    it("handles generic registration error", async () => {
      (apiClient.post as Mock).mockRejectedValueOnce(new Error("Generic error"));

      const formData = new FormData();
      formData.append("username", "testuser");
      formData.append("email", "test@example.com");
      formData.append("password", "password123");

      await action({
        request: { formData: () => Promise.resolve(formData) }
      } as any);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("Registration failed", {
          autoClose: 2000
        });
      });
    });
  });
});
