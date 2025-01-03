import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import navReducer from "./navSlice";
import modalReduer from "./modalSlice";
import sidebarReducer from "./sideBar";
import userReducer from "./userSlice";
import profileReducer from "./profileSlice";

// Persist configuration for slices you want to persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "profile"], // Specify the slices to persist
};

// Create persisted reducers
const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedProfileReducer = persistReducer(persistConfig, profileReducer);

export const store = configureStore({
  reducer: {
    nav: navReducer,
    sidebar: sidebarReducer,
    modal: modalReduer,
    user: persistedUserReducer, // Use persisted version
    profile: persistedProfileReducer, // Use persisted version
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
