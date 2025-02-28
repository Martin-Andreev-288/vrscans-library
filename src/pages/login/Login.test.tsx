import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Login, { action } from "./Login";
import { apiClient } from "../../utils/apiClient";
import { toast } from "react-toastify";
import type { Mock } from "vitest";
import userReducer, { UserState } from "../../store/slices/userSlice";

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

describe("Login Component", () => {
  const mockStore = (
    initialState: Partial<UserState> = {
      user: null,
      status: "idle",
      error: null
    }
  ) =>
    configureStore({
      reducer: { userState: userReducer },
      preloadedState: { userState: initialState as UserState }
    });

  const renderComponent = (store = mockStore()) => {
    const router = createMemoryRouter(
      [
        {
          path: "/login",
          element: <Login />,
          action: action(store as any)
        }
      ],
      { initialEntries: ["/login"] }
    );

    return render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("displays login form elements", () => {
      renderComponent();

      expect(screen.getByAltText("Chaosgroup Logo")).toBeInTheDocument();
      expect(screen.getByAltText("VR Scan Image")).toBeInTheDocument();
      expect(screen.getByTestId("email")).toBeInTheDocument();
      expect(screen.getByTestId("password")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Log In" })).toBeInTheDocument();
    });
  });

  describe("Form Submission", () => {
    it("handles successful login", async () => {
      const store = mockStore();
      (apiClient.post as Mock).mockResolvedValueOnce({
        data: {
          user: { username: "test", email: "test@test.com", id: 1 },
          jwt: "test-jwt"
        }
      });

      const user = userEvent.setup();
      renderComponent(store);

      await user.type(screen.getByTestId("email"), "test@test.com");
      await user.type(screen.getByTestId("password"), "password123");
      await user.click(screen.getByRole("button", { name: "Log In" }));

      await waitFor(() => {
        expect(apiClient.post).toHaveBeenCalledWith("/login", {
          email: "test@test.com",
          password: "password123"
        });
        expect(store.getState().userState.user).toEqual({
          username: "test",
          email: "test@test.com",
          id: 1,
          jwt: "test-jwt"
        });
        expect(toast.success).toHaveBeenCalledWith("Login successful", {
          autoClose: 2000
        });
      });
    });

    it("handles login failure", async () => {
      const store = mockStore();
      (apiClient.post as Mock).mockRejectedValueOnce(new Error("API Error"));

      const user = userEvent.setup();
      renderComponent(store);

      await user.type(screen.getByTestId("email"), "test@test.com");
      await user.type(screen.getByTestId("password"), "wrongpass");
      await user.click(screen.getByRole("button", { name: "Log In" }));

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("Login failed", {
          autoClose: 2000
        });
        expect(store.getState().userState.user).toBeNull();
      });
    });
  });

  describe("Navigation", () => {
    it("contains working signup link", () => {
      renderComponent();
      const signupLink = screen.getByRole("link", { name: "Sign Up" });
      expect(signupLink).toHaveAttribute("href", "/signup");
    });

    it("has working home link in logo", () => {
      renderComponent();
      const homeLink = screen.getByRole("link", { name: "Chaosgroup Logo" });
      expect(homeLink).toHaveAttribute("href", "/");
    });
  });
});
