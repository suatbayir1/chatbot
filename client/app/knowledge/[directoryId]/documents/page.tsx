"use client";

/** React */
import React, { useEffect } from "react";

/** Next */
import { useParams } from "next/navigation";

/** Components */
import {
  Directories,
  CreateDocuments,
  DocumentTitle,
  StoredDocuments,
} from "@/components";

/** Redux */
import type { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { getDocuments } from "@/redux/features/document/documentSlice";

type Props = {};

const DocumentDetailPage = (props: Props) => {
  //** Hooks */
  const directories = useSelector(
    (state: RootState) => state.knowledge.directories
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getDocuments());

    return () => {};
  }, []);

  return (
    <div className="grid grid-cols-9 divide-x-2 divide-gray-300 bg-white">
      <div className="col-span-2 h-full">
        <Directories directories={directories} />
      </div>
      <div className="col-span-7">
        <DocumentTitle />
        <div className="p-3 pb-20 w-full max-w-5xl mx-auto">
          <CreateDocuments />
          <StoredDocuments />
        </div>
      </div>
    </div>
  );
};

export default DocumentDetailPage;
