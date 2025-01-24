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

// Load state from local storage
const loadFromLocalStorage = (): UserState => {
  try {
    if (typeof window !== null) {
      const serializedState = localStorage.getItem("userState");
      return serializedState
        ? JSON.parse(serializedState)
        : { user: null, isLoggedIn: false };
    }
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
  }
  return { user: null, isLoggedIn: false };
};

// Save state to local storage
const saveToLocalStorage = (state: UserState) => {
  try {
    if(typeof window !== null) {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("userState", serializedState);
    }
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

// Initial state with local storage integration
const initialState: UserState = loadFromLocalStorage();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState["user"]>) {
      state.user = action.payload;
      state.isLoggedIn = true;

      // Save to local storage
      saveToLocalStorage(state);

      console.log("user", state.user);
      console.log("isLoggedIn", state.isLoggedIn);
    },
    clearUser(state) {
      state.user = null;
      state.isLoggedIn = false;

      // Clear from local storage
      saveToLocalStorage(state);

      console.log("user", state.user);
      console.log("isLoggedIn", state.isLoggedIn);
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
