"use client";

import { Directory } from "@/types/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ** Types
import { Dispatch } from "redux";

/** Helpers */
import { getUrl } from "@/helpers/api";
import axios from "axios";

export interface KnowledgeState {
  activeDirectory: Directory;
  directories: Directory[];
}

export interface ReduxType {
  getState: any;
  dispatch: Dispatch<any>;
}

const initialState: KnowledgeState = {
  activeDirectory: <Directory>{},
  directories: [],
};

export const getDirectories = createAsyncThunk(
  "knowledge/getDirectories",
  async () => {
    try {
      const response = await axios.get(getUrl("knowledge/getDirectories"));
      if (response.status === 200) {
        return response.data.data;
      }

      return [];
    } catch (error) {
      throw error;
    }
  }
);

export const createDirectory = createAsyncThunk(
  "knowledge/createDirectory",
  async (params: { name: string }, { dispatch }: ReduxType) => {
    try {
      const response = await axios.post(
        getUrl(`knowledge/createDirectory`),
        params
      );

      if (response.status === 200) {
        dispatch(getDirectories());
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const knowledgeSlicer = createSlice({
  name: "knowledge",
  initialState,
  reducers: {
    setActiveDirectory: (state, action) => {
      state.activeDirectory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDirectories.fulfilled, (state, action) => {
      console.log("reducer state", action.payload);
      state.directories = action.payload;
    });
  },
});

export const { setActiveDirectory } = knowledgeSlicer.actions;

export default knowledgeSlicer.reducer;
