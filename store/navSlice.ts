import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

interface NavState {
  isOpen: boolean;
}

const initialState: NavState = {
  isOpen: false,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    toggleNav: (state) => {
      state.isOpen = !state.isOpen;
      console.log(state.isOpen);
    },
    closeNav: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleNav, closeNav } = navSlice.actions;
export const selectMenu = (state: RootState) => state.nav.isOpen;

export default navSlice.reducer;
