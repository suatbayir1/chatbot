"use client";
/** React */
import React, { useState } from "react";

/** Third Party Libraries */
import {
  FolderPlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

/** Components */
import { CreateDirectoryDialog } from "@/components/index";

type Props = {
  searchDirectoryTerm: string;
  setSearchDirectoryTerm: (value: string) => void;
};

const SearchCreateDirectory = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CreateDirectoryDialog
        isOpen={isOpen}
        closeModal={() => {
          setIsOpen(false);
        }}
      />

      <div className="m-5 flex">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="block h-5 w-5" aria-hidden="true" />
          </div>
          <input
            type="search"
            value={props.searchDirectoryTerm}
            onChange={(e) => props.setSearchDirectoryTerm(e.target.value)}
            className="block w-full p-2 pl-10 text-sm text-gray-900 
            border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 
            focus:border-blue-500 focus:outline-none"
            placeholder="Search folders..."
            required
          />
        </div>
        <div className="ml-auto">
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
            text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 
            dark:hover:bg-blue-700 dark:focus:ring-blue-800 
            border-transparent focus:border-transparent focus:ring-0"
          >
            <FolderPlusIcon className="block h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Icon description</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchCreateDirectory;
