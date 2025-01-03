"use client";

import { Provider } from "react-redux";
import { store, persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import LoadingScreen from "@/components/loading-screen";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export function PersistProviders({ children }: { children: React.ReactNode }) {
  return (
    <PersistGate loading={<LoadingScreen />} persistor={persistor}>
      {children}
    </PersistGate>
  );
}
