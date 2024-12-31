import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: null | { id: string; email: string };
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ id: string; email: string }>) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUser(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
