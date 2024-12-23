import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./navSlice";
import sidebarReducer from "./sideBar";

export const store = configureStore({
  reducer: {
    nav: navReducer,
    sidebar: sidebarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
