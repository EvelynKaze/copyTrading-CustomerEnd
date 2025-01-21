// Redux slice for profile management with local storage
import { createSlice } from "@reduxjs/toolkit";

// Load state from local storage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("profileState");
    return serializedState
      ? JSON.parse(serializedState)
      : {
          profile: {
            id: null,
            full_name: "",
            email_address: "",
            phone_number: "",
            user_name: "",
            avatar_url: "",
            copy_trader: null,
            account_status: null,
            total_investment: null,
            current_value: null,
            roi: null,
            kyc_status: false,
            isAdmin: false,
            user_id: "",
          },
        };
  } catch (error) {
    console.error("Error loading profile state from localStorage:", error);
    return {
      profile: {
        id: null,
        full_name: "",
        email_address: "",
        phone_number: "",
        user_name: "",
        avatar_url: "",
        copy_trader: null,
        account_status: null,
        total_investment: null,
        current_value: null,
        roi: null,
        kyc_status: false,
        isAdmin: false,
        user_id: "",
      },
    };
  }
};

// Save state to local storage
const saveToLocalStorage = (state: {
  profile: (typeof initialState)["profile"];
}) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("profileState", serializedState);
  } catch (error) {
    console.error("Error saving profile state to localStorage:", error);
  }
};

// Initial state with local storage integration
const initialState = loadFromLocalStorage();

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;

      // Save updated state to local storage
      saveToLocalStorage(state);
    },
    clearProfile: (state) => {
      state.profile = {
        id: null,
        full_name: "",
        email_address: "",
        phone_number: "",
        user_name: "",
        avatar_url: "",
        copy_trader: null,
        account_status: null,
        total_investment: null,
        current_value: null,
        roi: null,
        kyc_status: false,
        isAdmin: false,
        user_id: "",
      };

      // Save cleared state to local storage
      saveToLocalStorage(state);
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
