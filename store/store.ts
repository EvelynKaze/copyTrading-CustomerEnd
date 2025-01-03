import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./navSlice";
import modalReduer from "./modalSlice";
import sidebarReducer from "./sideBar";
import userReducer from "./userSlice";
import profileReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
    sidebar: sidebarReducer,
    modal: modalReduer,
    user: userReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
