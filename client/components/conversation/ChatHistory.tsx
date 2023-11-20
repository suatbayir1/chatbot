"use client";
/** React */
import React from "react";

/** Redux */
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

/** Icons */
import {
  DocumentPlusIcon,
  ClipboardIcon,
  RocketLaunchIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

/** Helpers */
import { toDateString } from "@/helpers/view";

type Props = {};

const ChatHistory = (props: Props) => {
  /** Hooks */
  const { chatHistory } = useSelector((state: RootState) => state.conversation);

  return (
    <div className="h-full overflow-hidden pb-36">
      <div className="flex flex-col max-h-96 overflow-y-scroll">
        {chatHistory.map((item, idx) => {
          if (item.type === "question") {
            return (
              <div className="px-4 py-6 relative group bg-white" key={idx}>
                <div
                  className="bg-slate-50 text-slate-500 absolute top-0 
            left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-xs"
                >
                  {toDateString(item.createdAt)}
                </div>
                <div
                  data-v-d6619266=""
                  className="flex items-center max-w-3xl mx-auto
            gap-4 md:px-6 relative"
                >
                  <div data-v-d6619266="" className="self-start shrink-0">
                    <div
                      data-v-d6619266=""
                      className="aspect-square rounded-full overflow-hidden relative w-9"
                    >
                      <div
                        className="bg-lime-100 text-lime-700 ring-lime-400 
                  border-lime-400 absolute inset-0 h-full h-full flex items-center
                  justify-center tracking-wider"
                      >
                        SB
                      </div>
                      <div className="absolute inset-0">
                        <img
                          src="https://www.gravatar.com/avatar/999d8363389aa869f403e40a2b7f6219?r=pg&amp;s=200&amp;d=blank"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>
                  <div data-v-d6619266="" className="flex-1">
                    <div
                      data-v-d6619266=""
                      className="content prose prose-slate break-words pr-4 mr-2"
                    >
                      <p>
                        {item.text}
                        <button
                          aria-label="insert into scratchpad"
                          className="p-1 absolute top-1 right-1"
                        >
                          <DocumentPlusIcon
                            className="shrink-0 w-5 h-5 opacity-90"
                            aria-hidden="true"
                          />
                        </button>
                      </p>
                    </div>
                  </div>
                  <div
                    data-v-d6619266=""
                    className="absolute right-0 top-0"
                  ></div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="px-4 py-6 relative group bg-slate-50" key={idx}>
                <div
                  className="bg-white text-slate-500 absolute top-0 left-1/2 -translate-x-1/2 
                  px-2 py-0.5 rounded-md text-xs"
                >
                  {toDateString(item.createdAt)}
                </div>
                <div className="flex items-center max-w-3xl mx-auto gap-4 md:px-6 relative">
                  <div className="self-start shrink-0">
                    <div className="w-9 h-9 rounded-full">
                      <RocketLaunchIcon
                        className="shrink-0 w-6 h-6 opacity-90"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div
                      className="content prose prose-slate 
                break-words pr-4 mr-2"
                    >
                      <p>{item.text}</p>
                    </div>
                    <div className="mt-2 text-xs">
                      <div className="text-gray-500">
                        Answer based on these documents:
                      </div>
                      <div
                        data-v-d6619266=""
                        className="flex flex-wrap gap-x-4 gap-y-1"
                      >
                        <button className="inline-flex items-center gap-1">
                          <DocumentTextIcon
                            className="block w-4 h-4"
                            aria-hidden="true"
                          />{" "}
                          cv.pdf
                        </button>
                      </div>
                    </div>
                  </div>
                  <div data-v-d6619266="" className="absolute right-0 top-0">
                    <button
                      aria-label="Copy response"
                      className="p-1 text-slate-400 rounded hover:bg-slate-200 hover:text-slate-700"
                    >
                      <ClipboardIcon
                        className="block w-4 h-4"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ChatHistory;
