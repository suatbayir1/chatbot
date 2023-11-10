/** Types */
import { Conversation } from "@/types/type";
import { Dispatch } from "redux";

/** Helpers */
import { getUrl } from "@/helpers/api";
import axios from "axios";

/** Redux */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ConversationState {
  activeConversation: Conversation;
  conversations: Conversation[];
}

export interface ReduxType {
  getState: any;
  dispatch: Dispatch<any>;
}

const initialState: ConversationState = {
  activeConversation: <Conversation>{},
  conversations: [],
};

export const getConversations = createAsyncThunk(
  "conversation/getConversations",
  async () => {
    try {
      const response = await axios.get(getUrl("conversation/getConversations"));
      if (response.status === 200) {
        return response.data.data;
      }

      return [];
    } catch (error) {
      throw error;
    }
  }
);

export const createConversation = createAsyncThunk(
  "conversation/createConversation",
  async (params: {}, { dispatch }: ReduxType) => {
    try {
      const response = await axios.post(
        getUrl(`conversation/createConversation`)
      );

      if (response.status === 200) {
        dispatch(getConversations());
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const conversationSlicer = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getConversations.fulfilled, (state, action) => {
      console.log("reducer state", action.payload);
      state.conversations = action.payload;
    });
  },
});

export const { setActiveConversation } = conversationSlicer.actions;

export default conversationSlicer.reducer;
