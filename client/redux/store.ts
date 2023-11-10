"use client";

/** Redux */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

/** Redcuers */
import navbarSlice from "@/redux/features/navbar/navbarSlice";
import knowledgeSlice from "./features/knowledge/knowledgeSlice";
import conversationSlice from "./features/conversation/conversationSlice";
import documentSlice from "./features/document/documentSlice";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  navbar: navbarSlice,
  knowledge: knowledgeSlice,
  conversation: conversationSlice,
  document: documentSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
