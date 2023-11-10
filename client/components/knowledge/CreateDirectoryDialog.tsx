"use client";
/** Libraries */
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";

/** Redux */
import type { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  createDirectory,
  setActiveDirectory,
} from "@/redux/features/knowledge/knowledgeSlice";
import { unwrapResult } from "@reduxjs/toolkit";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

const CreateDirectoryDialog = (props: Props) => {
  //** Hooks */
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, closeModal } = props;
  const [documentName, setDocumentName] = useState<string>("");
  const router = useRouter();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Create Folder
                </Dialog.Title>
                <div className="mt-4">
                  <input
                    type="search"
                    className="block w-full p-2 text-sm text-gray-900 
                    border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 
                    focus:border-blue-500 focus:outline-none"
                    placeholder="Document name"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-4 flex gap-4">
                  <button
                    disabled={documentName ? false : true}
                    type="button"
                    className={
                      "bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
                    }
                    onClick={() =>
                      dispatch(createDirectory({ name: documentName }))
                        .then(unwrapResult)
                        .then((result) => {
                          closeModal();
                          dispatch(setActiveDirectory(result));
                          router.push(`/knowledge/${result._id}/documents`);
                        })
                    }
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className={
                      "bg-gray-200 hover:bg-gray-300 text-dark py-2 px-4 rounded cursor-pointer"
                    }
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateDirectoryDialog;
