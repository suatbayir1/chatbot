"use client";
/** React */
import React, { useEffect } from "react";

/** Components */
import { EmptyState, Conversations } from "@/components";

/** Redux */
import type { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  getConversations,
  setActiveConversation,
} from "@/redux/features/conversation/conversationSlice";

type Props = {};

const page = (props: Props) => {
  //** Hooks */
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setActiveConversation({}));
    dispatch(getConversations());

    return () => {};
  }, []);

  return (
    <div className="grid grid-cols-9 divide-x-2 divide-gray-300 bg-white">
      <div className="col-span-2 h-full">
        <Conversations />
      </div>
      <div className="col-span-7">
        <EmptyState text={"Select a conversation"} />
      </div>
    </div>
  );
};

export default page;
