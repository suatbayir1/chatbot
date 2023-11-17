/** Libraries */
import React, { useState } from "react";
import {
  Cog6ToothIcon,
  ChatBubbleLeftEllipsisIcon,
  PencilIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { MicrophoneIcon } from "@heroicons/react/24/solid";

type Props = {};

const ChatQueryInput = (props: Props) => {
  const maxLength = 5000;
  const [question, setQuestion] = useState<string>("");

  return (
    <div className="absolute w-full bottom-0 left-0 px-4 md:px-6 pb-6 pt-0.5 bg-white">
      <div className="max-w-3xl mx-auto">
        <div
          className="relative border-2 ring ring-slate-100 rounded-lg bg-white 
          focus-within:ring-blue-100 focus-within:border-blue-300"
        >
          <div className="relative w-full">
            <textarea
              value={question}
              maxLength={maxLength}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask Cody"
              className="w-full max-h-400 px-4 pt-3 pb-0 bg-transparent resize-none 
              rounded-lg border-0 focus:outline-none focus:ring-0 h-full resize-none flex-1"
              style={{ height: "36px" }}
            />
            <div className="text-gray-400 text-xs text-right px-3 font-medium">
              {question.length}/{maxLength}
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-3">
              <div className="relative inline-block text-left -ml-2">
                <div>
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    data-headlessui-state=""
                    aria-label="Conversation options"
                    className="inline-flex border hover:bg-slate-100 px-2 py-1.5 
                    rounded-md group"
                  >
                    <Cog6ToothIcon
                      className="block h-4 w-4"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
              <div className="flex items-center border rounded-md">
                <button
                  className="flex items-center gap-2 text-sm px-2 
                  py-1 rounded-l-md hover:bg-slate-100"
                >
                  <ChatBubbleLeftEllipsisIcon
                    className="block h-4 w-4"
                    aria-hidden="true"
                  />
                  <span className="line-clamp-1">Factual Cody</span>
                </button>
                <button className="border-l rounded-r-md py-2 px-3 hover:bg-slate-100">
                  <PencilIcon className="h-3 w-3" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                aria-label="start speech recognition"
                className="px-2 py-1 rounded-md text-slate-400 hover:bg-slate-200
                hidden lg:inline-block"
              >
                <MicrophoneIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <button
                className="-mr-2 inline-flex items-center font-medium gap-2 px-2 py-1.5
                rounded-md enabled:hover:bg-blue-100 enabled:hover:text-blue-400 
                enabled:hover:text-blue-400 disabled:cursor-not-allowed text-slate-400"
                aria-label="Send message"
                disabled={question.trim() ? false : true}
              >
                <PaperAirplaneIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatQueryInput;
