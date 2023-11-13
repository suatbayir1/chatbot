"use client";
/** Libraries */
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

/** Redux */
import type { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

type Props = {
  isOpen: boolean;
  title: string;
  onUpdate: (rename: string) => void;
  closeModal: () => void;
};

const RenameDialog = (props: Props) => {
  //** Hooks */
  const dispatch = useDispatch<AppDispatch>();
  const [rename, setRename] = useState<string>("");

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
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
                  {props.title}
                </Dialog.Title>
                <div className="mt-4">
                  <input
                    type="search"
                    className="block w-full p-2 text-sm text-gray-900 
                    border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 
                    focus:border-blue-500 focus:outline-none"
                    placeholder="Document name"
                    value={rename}
                    onChange={(e) => setRename(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-4 flex gap-4">
                  <button
                    disabled={rename ? false : true}
                    type="button"
                    className={
                      "bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
                    }
                    onClick={() => props.onUpdate(rename)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className={
                      "bg-gray-200 hover:bg-gray-300 text-dark py-2 px-4 rounded cursor-pointer"
                    }
                    onClick={props.closeModal}
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

export default RenameDialog;
