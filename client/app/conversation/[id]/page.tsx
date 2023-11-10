"use client";
/** React */
import React, { useEffect } from "react";

/** Components */
import {
  Conversations,
  Options,
  ChatHistory,
  ChatQueryInput,
} from "@/components";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="grid grid-cols-9 divide-x-2 divide-gray-300 bg-white">
      <div className="col-span-2 h-full">
        <Conversations />
      </div>
      <div className="col-span-7">
        <div className="flex flex-row w-full h-full relative">
          <div className="flex-grow relative wrapper">
            <ChatHistory />
            <ChatQueryInput />
          </div>
          <Options />
        </div>
      </div>
    </div>
  );
};

export default page;
