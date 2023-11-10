"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface NavbarState {
  activePage: string;
}

const initialState: NavbarState = {
  activePage: "Chat",
};

export const navbarSlicer = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
  },
});

export const { setActivePage } = navbarSlicer.actions;

export default navbarSlicer.reducer;
