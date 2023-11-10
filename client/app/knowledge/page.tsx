"use client";

/** React */
import React, { useEffect } from "react";

/** Components */
import { Directories, EmptyState } from "@/components";

/** Redux */
import type { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  getDirectories,
  setActiveDirectory,
} from "@/redux/features/knowledge/knowledgeSlice";

type Props = {};

const KnowledgePage = (props: Props) => {
  //** Hooks */
  const directories = useSelector(
    (state: RootState) => state.knowledge.directories
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setActiveDirectory({}));
    dispatch(getDirectories());

    return () => {};
  }, []);

  return (
    <div className="grid grid-cols-9 divide-x-2 divide-gray-300 bg-white">
      <div className="col-span-2 h-full">
        <Directories directories={directories} />
      </div>
      <div className="col-span-7">
        <EmptyState text={"Select a folder"} />
      </div>
    </div>
  );
};

export default KnowledgePage;
