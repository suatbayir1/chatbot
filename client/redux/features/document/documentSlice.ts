"use client";

/** Libraries */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

/** Helpers */
import { getUrl } from "@/helpers/api";
import { toast } from "@/helpers/view";

// ** Types
import { Dispatch } from "redux";
import { Document } from "@/types/type";

/** Actions */
import { getDirectories } from "@/redux/features/knowledge/knowledgeSlice";

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
      const response = await axios.post(
        getUrl(`document/${getState().knowledge.activeDirectory._id}/upload`),
        params.formData,
        {
          onUploadProgress: params.onUploadProgress,
        }
      );

      if (response.status === 200) {
        dispatch(getDirectories());
        dispatch(getDocuments());
        return response.data.data;
      }
    } catch (error: any) {
      toast.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
      return undefined;
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
