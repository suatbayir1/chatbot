/** React */
import React from "react";

/** Components */
import { SearchCreateDirectory, DirectoryList } from "@/components/index";

/** Types */
import { Directory } from "@/types/type";

type Props = {
  directories: Directory[];
};

const Directories = (props: Props) => {
  return (
    <>
      <SearchCreateDirectory />
      <DirectoryList directories={props.directories} />
    </>
  );
};

export default Directories;
