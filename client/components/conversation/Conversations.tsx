/** React */
import React from "react";

/** Components */
import { SearchCreateConversation, ConversationList } from "@/components";

type Props = {};

const Conversations = (props: Props) => {
  return (
    <>
      <SearchCreateConversation />
      <ConversationList />
    </>
  );
};

export default Conversations;
