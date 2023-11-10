/** React */
import React from "react";

/** Third Party Libraries */
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

type Props = {
  text: string;
};

const EmptyState = (props: Props) => {
  return (
    <div className="flex h-screen">
      <div className="m-auto text-2xl font-medium flex items-center gap-4 text-violet-800">
        <ArrowLeftIcon className="w-10 h-10 animate-bounce" />
        <h3 className="text-xl font-bold">{props.text}</h3>
      </div>
    </div>
  );
};

export default EmptyState;
