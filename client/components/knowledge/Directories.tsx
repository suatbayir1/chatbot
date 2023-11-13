/** React */
import React, { useState } from "react";

/** Components */
import { SearchCreateDirectory, DirectoryList } from "@/components/index";

/** Types */
import { Directory } from "@/types/type";

type Props = {
  directories: Directory[];
};

const Directories = (props: Props) => {
  const [searchDirectoryTerm, setSearchDirectoryTerm] = useState<string>("");

  return (
    <>
      <SearchCreateDirectory
        searchDirectoryTerm={searchDirectoryTerm}
        setSearchDirectoryTerm={setSearchDirectoryTerm}
      />
      <DirectoryList
        directories={props.directories}
        searchDirectoryTerm={searchDirectoryTerm}
      />
    </>
  );
};

export default Directories;
