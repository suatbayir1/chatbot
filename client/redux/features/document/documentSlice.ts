"use client";

/** Libraries */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/** Helpers */
import { getUrl } from "@/helpers/api";

// ** Types
import { Dispatch } from "redux";
import { Document } from "@/types/type";

export interface DocumentState {
  documents: Document[];
}

export interface ReduxType {
  getState: any;
  dispatch: Dispatch<any>;
}

const initialState: DocumentState = {
  documents: [],
};

export const getDocuments = createAsyncThunk(
  "document/getDocuments",
  async (_, { getState }: ReduxType) => {
    try {
      const response = await axios.get(
        getUrl(`document/${getState().knowledge.activeDirectory._id}/documents`)
      );
      if (response.status === 200) {
        return response.data.data;
      }

      return [];
    } catch (error) {
      throw error;
    }
  }
);

export const uploadDocument = createAsyncThunk(
  "document/upload",
  async (
    params: { formData: FormData; onUploadProgress: (event: any) => void },
    { getState, dispatch }: ReduxType
  ) => {
    try {
      console.log("store", getState().knowledge.activeDirectory);
      const response = await axios.post(
        getUrl(`document/${getState().knowledge.activeDirectory._id}/upload`),
        params.formData,
        {
          onUploadProgress: params.onUploadProgress,
        }
      );

      if (response.status === 200) {
        dispatch(getDocuments());
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const documentSlicer = createSlice({
  name: "document",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadDocument.fulfilled, (state, action) => {});
    builder.addCase(getDocuments.fulfilled, (state, action) => {
      state.documents = action.payload;
    });
  },
});

export default documentSlicer.reducer;
