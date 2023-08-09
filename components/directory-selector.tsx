"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button";

type Props = {
  setDir: Dispatch<SetStateAction<FileSystemDirectoryHandle | undefined>>;
  setFiles: Dispatch<SetStateAction<FileSystemFileHandle[]>>;
};

export function DirectorySelector({ setDir, setFiles }: Props) {
  const [err, setErr] = useState<boolean>();

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={async () => {
          try {
            const handle = await window.showDirectoryPicker();
            setDir(handle);

            const files = [];
            for await (const entry of handle.values()) {
              if (entry.kind === "file") {
                files.push(entry);
              }
            }

            setFiles(files);
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
