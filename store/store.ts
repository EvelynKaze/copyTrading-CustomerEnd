import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./navSlice";
import modalReduer from "./modalSlice";
import sidebarReducer from "./sideBar";

export const store = configureStore({
  reducer: {
    nav: navReducer,
    sidebar: sidebarReducer,
    modal: modalReduer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
