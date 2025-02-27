import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  username: string;
  email: string;
  id: number;
  jwt: string;
};

export type UserState = {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export const getUserFromStorage = (): User | null => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const initialState: UserState = {
  user: getUserFromStorage(),
  status: "idle",
  error: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.user = null;
      sessionStorage.removeItem("user");
    },
    editProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        sessionStorage.setItem("user", JSON.stringify(state.user));
      }
    }
  }
});

export const { loginUser, logoutUser, editProfile } = userSlice.actions;

export default userSlice.reducer;
