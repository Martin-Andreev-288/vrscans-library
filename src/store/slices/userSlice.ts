import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiClient } from "../../utils/apiClient";

export type User = {
  username: string;
  jwt: string;
};

type UserState = {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

// Initial state
const initialState: UserState = {
  user: null,
  status: "idle",
  error: null
};

// Async thunk to fetch user
export const fetchUser = createAsyncThunk<User, number, { rejectValue: string }>(
  "user/fetchUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/users/${id}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue("Failed to fetch user");
    }
  }
);

// Slice definition
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Error occurred";
      });
  }
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
