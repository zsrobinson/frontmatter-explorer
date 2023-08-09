"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button";

type Props = {
  setDirHandle: Dispatch<SetStateAction<FileSystemDirectoryHandle | undefined>>;
};

export function DirectorySelector({ setDirHandle }: Props) {
  const [err, setErr] = useState<boolean>();

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={async () => {
          try {
            setDirHandle(await window.showDirectoryPicker());
            setErr(false);
          } catch {
            setErr(true);
          }
        }}
      >
        Select Folder
      </Button>

      {err && (
        <p className="text-sm text-red-600 dark:text-red-400">
          We had trouble opening that folder. Please try again.
        </p>
      )}
    </div>
  );
}
