// Redux slice for profile management
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: {
        id: null,
        full_name: "",
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

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        clearProfile: (state) => {
            state.profile = initialState.profile;
        },
    },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
