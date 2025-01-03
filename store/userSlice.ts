import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: null | {
    id: string;
    email: string;
    name: string;
    emailVerification: boolean;
  };
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
    setUser(state, action: PayloadAction<UserState["user"]>) {
      state.user = action.payload;
      state.isLoggedIn = true;
      console.log("user", state.user);
      console.log("isLoggedIn", state.isLoggedIn);
    },
    clearUser(state) {
      state.user = null;
      state.isLoggedIn = false;

      console.log("user", state.user);
      console.log("isLoggedIn", state.isLoggedIn);
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
