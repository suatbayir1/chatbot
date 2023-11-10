"use client";
/** React */
import React from "react";
import { useRouter } from "next/navigation";

/** Third Party Libraries */
import {
  FolderPlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

/** Redux */
import { useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import {
  createConversation,
  setActiveConversation,
} from "@/redux/features/conversation/conversationSlice";
import { unwrapResult } from "@reduxjs/toolkit";

type Props = {};

const SearchCreateConversation = (props: Props) => {
  /** Hooks */
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return (
    <>
      <div className="m-5 flex">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="block h-5 w-5" aria-hidden="true" />
          </div>
          <input
            type="search"
            className="block w-full p-2 pl-10 text-sm text-gray-900 
            border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 
            focus:border-blue-500 focus:outline-none"
            placeholder="Search conversation..."
            required
          />
        </div>
        <div className="ml-auto">
          <button
            onClick={() =>
              dispatch(createConversation({}))
                .then(unwrapResult)
                .then((result) => {
                  dispatch(setActiveConversation(result));
                  router.push(`/conversation/${result._id}`);
                })
            }
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
            text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 
            dark:hover:bg-blue-700 dark:focus:ring-blue-800 
            border-transparent focus:border-transparent focus:ring-0"
          >
            <FolderPlusIcon className="block h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchCreateConversation;
