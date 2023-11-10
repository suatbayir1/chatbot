"use client";
import React from "react";

import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  ChatBubbleLeftEllipsisIcon,
  TrashIcon,
  PencilIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

type Props = {};

const DocumentTitle = (props: Props) => {
  return (
    <div
      className="w-full h-16 px-6 py-3 border-b flex flex-col items-start
        gap-4 md:flex-row md:gap-0 md:items-center justify-between"
    >
      <div className="w-full flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <div className="text-right">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button
                  className="inline-flex w-full justify-center 
                  rounded-md px-1 py-2 text-sm font-medium
                  text-black hover:bg-gray-100 text-xl  focus:outline-none
                  focus-visible:ring-2 focus-visible:ring-white/75"
                >
                  Options
                  <EllipsisVerticalIcon
                    className="ml-2 -mr-1 mt-1 h-5 w-5 text-dark h-6 w-6"
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
                <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
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
                            active ? "bg-red-400 text-white" : "text-gray-900"
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
        </div>
      </div>
    </div>
  );
};

export default DocumentTitle;
