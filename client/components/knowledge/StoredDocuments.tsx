"use client";
import { Fragment, useState } from "react";

/** Third Party Libraries */
import {
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";

/** Redux */
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

/** Helpers */
import { subStringWithContinue, toDateString } from "@/helpers/view";

type Props = {};

const StoredDocuments = (props: Props) => {
  //** Hooks */
  const documents = useSelector((state: RootState) => state.document.documents);
  const [searchDocumentTerm, setSearchDocumentTerm] = useState<string>("");

  return (
    <section className="mt-8">
      <div className="flex flex-wrap items-start items-center gap-6">
        <div className="w-full lg:w-auto">
          <h3 className="font-medium">Stored Documents</h3>
          <p className="text-slate-500 text-sm">
            {" "}
            These are all uploaded documents that chatbot can learn from.
          </p>
        </div>
        <div className="ml-auto flex w-full lg:w-auto gap-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon
                className="block h-5 w-5"
                aria-hidden="true"
              />
            </div>
            <input
              type="search"
              value={searchDocumentTerm}
              onChange={(e) => setSearchDocumentTerm(e.target.value)}
              className="block w-full p-2 pl-10 text-sm text-gray-900 
              border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 
              focus:border-blue-500 focus:outline-none"
              placeholder="Search folders..."
              required
            />
          </div>
        </div>
      </div>
      <div className="mt-6 lg:mt-3">
        <div className="pl-10 pr-12 border-b relative">
          <div
            className="grid grid-cols-12 gap-4 px-2 py-1 font-medium text-sm uppercase 
          text-slate-600"
          >
            <div className="col-span-5">Name</div>
            <div className="col-span-2 pl-4">Status</div>
            <div className="hidden lg:col-span-2 lg:block">Edited On</div>
            <div className="hidden lg:col-span-2 lg:block">Created On</div>
            <div className="hidden lg:col-span-1 lg:block"></div>
          </div>
        </div>
        {documents.map((document) => (
          <div
            key={document._id}
            className="flex items-center py-4 pl-10 pr-12 border-b relative"
          >
            <div className="absolute left-4 leading-none">
              <input
                className="rounded border-slate-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring 
            focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50"
                type="checkbox"
              />
            </div>
            <a className="flex-1 grid grid-cols-12 gap-4 px-2 items-center group">
              <div className="col-span-5 group-hover:text-blue-800">
                <span className="line-clamp-2 leading-snug">
                  {subStringWithContinue(document.originalName, 30)}
                </span>
              </div>
              <div className="col-span-2">
                <span
                  className="px-4 py-1 rounded-full text-xs uppercase tracking-wide font-medium
               bg-green-50 text-green-700"
                >
                  {document.status}
                </span>
              </div>
              <div className="hidden lg:col-span-2 lg:block text-slate-600 text-sm">
                {toDateString(document.updatedAt)}
              </div>
              <div className="hidden lg:col-span-2 lg:block text-slate-600 text-sm">
                {toDateString(document.createdAt)}
              </div>
              <div className="relative lg-col-span-1 ml-auto">
                <Menu
                  as="div"
                  className="relative inline-block text-left align-right"
                >
                  <div>
                    <Menu.Button
                      className="inline-flex w-full justify-center 
                            rounded-md px-1 py-2 text-sm font-medium
                            text-black hover:bg-blue-200 text-xl hover:text-blue-800 focus:outline-none
                            focus-visible:ring-2 focus-visible:ring-white/75"
                    >
                      <EllipsisVerticalIcon
                        className="h-5 w-5 text-dark h-6 w-6"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      className="
                    absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y
                    divide-gray-100 rounded-md bg-white shadow-lg ring-1
                    ring-black/5 focus:outline-none"
                    >
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <PencilIcon
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                              Rename
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-red-400 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <TrashIcon
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoredDocuments;
