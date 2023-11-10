"use client";
import React, { ChangeEvent, useState } from "react";

/** Icons */
import {
  PencilSquareIcon,
  ArrowUpTrayIcon,
  LinkIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

/** Components */
import { UploadDocumentForm } from "@/components/index";

/** Redux */
import type { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { uploadDocument } from "@/redux/features/document/documentSlice";

type Props = {};

const CreateDocuments = (props: Props) => {
  //** Hooks */
  const { activeDirectory } = useSelector(
    (state: RootState) => state.knowledge
  );
  const dispatch = useDispatch<AppDispatch>();
  const [activeComponent, setActiveComponent] = useState<string>("buttons");
  const [file, setFile] = useState<File>();
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const Buttons = () => {
    return (
      <div className="mt-4 grid sm:grid-cols-3 gap-4">
        <button className="px-4 py-3 rounded-lg text-left border-2 border-blue-400 bg-blue-50 transition-colors hover:border-blue-500 hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
          <PencilSquareIcon
            className="w-6 h-6 text-blue-800"
            aria-hidden="true"
          />
          <div className="mt-2 font-medium text-lg">Write</div>
          <div className="leading-snug text-slate-800">
            {" "}
            Write or copy paste your document{" "}
          </div>
        </button>
        <button
          onClick={() => setActiveComponent("upload")}
          className="px-4 py-3 rounded-lg text-left border-2 border-purple-400 
          bg-purple-50 transition-colors hover:border-purple-500 hover:bg-purple-100
          focus:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400
          focus:ring-offset-2"
        >
          <ArrowUpTrayIcon
            className="w-6 h-6 text-purple-800"
            aria-hidden="true"
          />
          <div className="mt-2 font-medium text-lg">Upload</div>
          <div className="leading-snug text-slate-800">
            {" "}
            PDF, Word or Powerpoint files{" "}
          </div>
        </button>
        <button className="px-4 py-3 rounded-lg text-left border-2 border-emerald-400 bg-emerald-50 transition-colors focus:outline-none hover:border-emerald-500 hover:bg-emerald-100 focus:bg-emerald-100  focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2">
          <div className="flex items-center justify-between">
            <LinkIcon className="w-6 h-6 text-emerald-800" aria-hidden="true" />
          </div>
          <div className="mt-2 font-medium text-lg">Import Website</div>
          <div className="leading-snug text-slate-800">
            {" "}
            Webpage with text content{" "}
          </div>
        </button>
      </div>
    );
  };

  const onUploadProgress = (event: any) => {
    const percentCompleted = Math.round((event.loaded * 100) / event.total);
    console.log("onUploadProgress", percentCompleted);
    setUploadProgress(percentCompleted);
  };

  const onChangeFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log("file");

      const formData: FormData = new FormData();
      formData.append("file", e.target.files[0]);

      const payload = {
        formData,
        onUploadProgress,
      };

      dispatch(uploadDocument(payload))
        .then(unwrapResult)
        .then((result) => {
          setTimeout(() => {
            setFile(undefined);
          }, 3000);
        });
    }
  };

  return (
    <section>
      <h3 className="font-medium">Create Documents</h3>
      <p className="text-slate-500 text-sm">
        {" "}
        You can create a new document in this folder by writing, uploading an
        existing document or importing a webpage.{" "}
      </p>
      <div className="mt-4">
        {activeComponent !== "buttons" && (
          <button
            type="button"
            className="flex items-center gap-2 mb-2"
            onClick={() => setActiveComponent("buttons")}
          >
            <ChevronLeftIcon className="w-4 h-4" aria-hidden="true" />
            Options
          </button>
        )}
        {activeComponent === "buttons" && <Buttons />}
        {activeComponent === "upload" && (
          <UploadDocumentForm
            onChangeFileUpload={onChangeFileUpload}
            uploadProgress={uploadProgress}
            file={file}
          />
        )}
      </div>
    </section>
  );
};

export default CreateDocuments;
