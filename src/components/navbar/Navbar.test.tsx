import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import Navbar from "./Navbar";
import userReducer, { type User, type UserState } from "../../store/slices/userSlice";

describe("Navbar Component", () => {
  const mockStore = (user: User | null = null) =>
    configureStore({
      reducer: { userState: userReducer },
      preloadedState: {
        userState: {
          user,
          status: "idle",
          error: null
        } as UserState
      }
    });

  it("shows login button when user is not authenticated", () => {
    render(
      <Provider store={mockStore()}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();
    expect(screen.queryByText("Favorites")).not.toBeInTheDocument();
  });

  it("shows user-specific links when authenticated", () => {
    const testUser: User = {
      id: 1,
      username: "testuser",
      email: "test@test.com",
      jwt: "test-token"
    };

    render(
      <Provider store={mockStore(testUser)}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Favorites")).toBeInTheDocument();
    expect(screen.getByText("Collections")).toBeInTheDocument();
    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
  });
});
