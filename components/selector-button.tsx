"use client";

import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

type Props = {
  setDirHandle: Dispatch<SetStateAction<FileSystemDirectoryHandle | undefined>>;
} & React.ComponentPropsWithoutRef<typeof Button>;

export function SelectorButton({ setDirHandle, ...rest }: Props) {
  return (
    <Button
      onClick={async () => {
        try {
          setDirHandle(await window.showDirectoryPicker());
        } catch {
          console.error("User cancelled directory selection");
        }
      }}
      {...rest}
    >
      Select Folder
    </Button>
  );
}
