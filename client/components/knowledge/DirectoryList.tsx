"use client";
/** React */
import React, { useState } from "react";

/** Next */
import Link from "next/link";

/** Third Party Libraries */
import { FolderIcon } from "@heroicons/react/24/outline";

/** Types */
import { Directory } from "@/types/type";

/** Redux */
import type { RootState } from "@/redux/store";
import { setActiveDirectory } from "@/redux/features/knowledge/knowledgeSlice";
import { useSelector, useDispatch } from "react-redux";

/** Helpers */
import { filterByKeyValue } from "@/helpers/filter";

type Props = {
  searchDirectoryTerm: string;
  directories: Directory[];
};

const DirectoryList = (props: Props) => {
  /** Hooks */
  const activeDirectory = useSelector(
    (state: RootState) => state.knowledge.activeDirectory
  );
  const dispatch = useDispatch();

  return (
    <div className="m-5">
      {filterByKeyValue(
        props.directories,
        "name",
        props.searchDirectoryTerm
      ).map((item: Directory, index: number) => (
        <Link
          key={item._id}
          href={`/knowledge/${item._id}/documents`}
          onClick={() => {
            dispatch(setActiveDirectory(item));
          }}
        >
          <div
            key={index}
            className="p-2 flex cursor-pointer text-[#475569] hover:text-[#1E3A8A]"
            style={{
              backgroundColor:
                activeDirectory._id === item._id ? "#DBE6FE" : "",
            }}
          >
            <FolderIcon className="block h-6 w-6" aria-hidden="true" />
            <p className="ml-2">{item.name}</p>
            <span
              className="ml-auto inline-flex items-center bg-sky-100 
            text-xs font-medium  px-2.5 py-0.5
            rounded-full dark:bg-green-900 dark:text-green-300"
            >
              <p>{item.documents.length}</p>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DirectoryList;
