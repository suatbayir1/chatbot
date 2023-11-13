/** React */
import React, { ChangeEvent } from "react";

/** Icons */
import {
  ArrowUpTrayIcon,
  DocumentIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

type Props = {
  file: File | undefined;
  uploadProgress: number;
  onChangeFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
};

const UploadDocumentForm = (props: Props) => {
  return (
    <div>
      <div
        className="border-slate-200 p-6 border-2 border-dashed rounded-md flex flex-col 
      items-center transition-colors"
      >
        <label className="contents" role="button">
          <span className="p-4 rounded-full bg-slate-100">
            <ArrowUpTrayIcon
              className="w-6 h-6 transition-colors text-slate-700"
              aria-hidden="true"
            />
          </span>
          <div className="mt-4">
            <span className="font-medium underline">Click to upload</span>
            <span className="hidden md:inline text-slate-500">
              {" "}
              or drag and drop
            </span>
          </div>
          <div className="mt-0.5 text-sm text-slate-500">
            {" "}
            Up to 1 file like word, powerpoint or PDF, and upto 100 MB.{" "}
          </div>
          <div className="text-red-500 text-sm font-medium mt-2"></div>
          <input
            accept=".txt,.rtf,.pdf,.md,.ppt,.pptx,.pptm,.doc,.docx,.docm,.xls,.xlsx,.xlsm"
            className="invisible w-0 h-0"
            type="file"
            onClick={(e: any) => {
              e.target.value = null;
            }}
            onChange={props.onChangeFileUpload}
          />
        </label>
      </div>
      {props.file && (
        <section className="mt-8">
          <h3 className="font-medium">Pending</h3>
          <p className="text-slate-500 text-sm">
            {" "}
            These imports will appear as stored after they are uploaded and
            transformed for learning.{" "}
          </p>
          <div className="mt-3 space-y-3">
            <div className="border rounded px-3 py-2 relative">
              <div className="flex items-center gap-2">
                <span className="border p-2 rounded-lg">
                  <DocumentIcon
                    className="w-4 h-4 transition-colors text-slate-700"
                    aria-hidden="true"
                  />
                </span>
                <span className="flex flex-col leading-snug pr-6">
                  <span className="text-sm md:text-base line-clamp-1">
                    {props.file.name}
                  </span>
                  <span className="text-sm text-slate-500">
                    {(props.file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </span>
              </div>
              <div className="pl-10 mt-1.5 flex items-center gap-4">
                <div className="w-full h-1.5 bg-gradient-to-r from-violet-500 to-blue-600 rounded overflow-hidden relative">
                  <div
                    className="h-full absolute top-0 right-0 bg-slate-200 transition-all"
                    style={{ width: `${100 - props.uploadProgress}%` }}
                  ></div>
                </div>
                <span className="text-xs leading-none">
                  {props.uploadProgress}%
                </span>
              </div>
              <button className="absolute right-0 top-0 p-3 hover:text-red-600">
                <TrashIcon
                  className="w-4 h-4 transition-colors text-slate-700"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default UploadDocumentForm;
