import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";
import Profile, { action } from "./Profile";
import { apiClient } from "../../utils/apiClient";
import { toast } from "react-toastify";
import type { Mock } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer, { UserState } from "../../store/slices/userSlice";

vi.mock("../../utils/apiClient");
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

vi.mock("../../components/accessDenied/AccessDenied", () => ({
  default: () => <div>Access Denied</div>
}));

vi.mock("../../features/profile/ProfileSidebar", () => ({
  default: () => <div>Profile Sidebar Mock</div>
}));

describe("Profile Component", () => {
  const mockStore = (
    initialState: Partial<UserState> = {
      user: { id: 1, username: "test", email: "test@test.com", jwt: "random" },
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
          path: "/profile",
          element: <Profile />,
          action: action(store as any)
        }
      ],
      { initialEntries: ["/profile"] }
    );

    return render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
  };

  describe("Rendering", () => {
    it("shows access denied for unauthorized users", () => {
      const store = mockStore({ user: null });
      renderComponent(store);
      expect(screen.getByText("Access Denied")).toBeInTheDocument();
    });

    it("renders profile form for authorized users", () => {
      renderComponent();
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Username")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Edit Profile" })).toBeInTheDocument();
    });
  });

  describe("Form Submission", () => {
    beforeEach(() => {
      sessionStorage.setItem("user", JSON.stringify({ id: 1 }));
    });

    it("handles successful profile update", async () => {
      const store = mockStore();
      (apiClient.patch as Mock).mockResolvedValueOnce({
        data: { username: "new", email: "new@test.com" }
      });

      const user = userEvent.setup();
      renderComponent(store);
      await user.clear(screen.getByLabelText("Email"));
      await user.type(screen.getByLabelText("Email"), "new@test.com");
      await user.click(screen.getByRole("button", { name: "Edit Profile" }));

      await waitFor(() => {
        expect(apiClient.patch).toHaveBeenCalledWith("/users/1", {
          email: "new@test.com",
          username: "test"
        });
        expect(toast.success).toHaveBeenCalledWith("Profile update successfully", {
          autoClose: 2000
        });
      });
    });

    it("handles profile update error", async () => {
      (apiClient.patch as Mock).mockRejectedValueOnce(new Error("API Error"));
      const user = userEvent.setup();
      renderComponent();

      await user.click(screen.getByRole("button", { name: "Edit Profile" }));

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("Failed to update profile data.", {
          autoClose: 2000
        });
      });
    });
  });

  describe("Logout", () => {
    it("dispatches logout action", async () => {
      const store = mockStore();
      const user = userEvent.setup();
      renderComponent(store);

      await user.click(screen.getByRole("button", { name: "Log Out" }));

      expect(store.getState().userState.user).toBeNull();
      expect(toast.success).toHaveBeenCalledWith("Logout successful!", {
        autoClose: 2000
      });
    });
  });
});
