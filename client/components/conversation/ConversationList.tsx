"use client";
/** React */
import { Fragment, useState } from "react";

/** Next */
import Link from "next/link";

/** Third Party Libraries */
import { Menu, Transition } from "@headlessui/react";
import {
  ChatBubbleLeftIcon,
  ChatBubbleBottomCenterTextIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

/** Types */
import { Conversation } from "@/types/type";

/** Components */
import { RenameConversation } from "@/components";

/** Redux */
import type { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setActiveConversation } from "@/redux/features/conversation/conversationSlice";

/** Helpers */
import { classNames } from "@/helpers/style";
import { filterByKeyValue } from "@/helpers/filter";

type Props = {
  searchConversationTerm: string;
};

const ConversationList = (props: Props) => {
  /** Hooks */
  const { conversations, activeConversation } = useSelector(
    (state: RootState) => state.conversation
  );
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <RenameConversation
        isOpen={isOpen}
        closeModal={() => {
          setIsOpen(false);
        }}
      />

      <div className="w-full max-w-md px-4 my-2">
        <ul>
          {filterByKeyValue(
            conversations,
            "name",
            props.searchConversationTerm
          ).map((item, idx) => (
            <li key={idx}>
              <div
                className={classNames(
                  "flex items-center justify-between my-1 rounded-md px-3",
                  activeConversation._id === item._id
                    ? "bg-blue-100 text-blue-900 hover:text-blue-900"
                    : "text-slate-600 hover:text-blue-800"
                )}
              >
                <Link
                  key={item._id}
                  href={`/conversation/${item._id}`}
                  onClick={() => {
                    dispatch(setActiveConversation(item));
                  }}
                >
                  <div className="py-2.5 flex-1 flex items-center gap-3">
                    <span className="-mb-1">
                      {activeConversation._id === item._id ? (
                        <ChatBubbleBottomCenterTextIcon
                          className="shrink-0 w-5 h-5 opacity-90"
                          aria-hidden="true"
                        />
                      ) : (
                        <ChatBubbleLeftIcon
                          className="shrink-0 w-5 h-5 opacity-90"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                    <span className="font-medium line-clamp-1 leading-tight">
                      {item.name.toString().substring(0, 20)}
                    </span>
                  </div>
                </Link>
                <div className="relative">
                  <Menu as="div" className="relative inline-block text-left">
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
                    absolute z-10 left-0 mt-2 w-56 origin-top-right divide-y
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
                                onClick={() => setIsOpen(true)}
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ConversationList;
