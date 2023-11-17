/** React */
import React, { useState } from "react";

/** Components */
import { SearchCreateConversation, ConversationList } from "@/components";

type Props = {};

const Conversations = (props: Props) => {
  /** Hooks */
  const [searchConversationTerm, setSearchConversationTerm] =
    useState<string>("");

  return (
    <>
      <SearchCreateConversation
        searchConversationTerm={searchConversationTerm}
        setSearchConversationTerm={setSearchConversationTerm}
      />
      <ConversationList searchConversationTerm={searchConversationTerm} />
    </>
  );
};

export default Conversations;
