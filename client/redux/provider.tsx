"use client";

/** Redux */
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
