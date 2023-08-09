"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";

export default function Page() {
  const [dir, setDir] = useState<FileSystemDirectoryHandle>();
  const [files, setFiles] = useState<FileSystemFileHandle[]>([]);
  const [err, setErr] = useState<boolean>();

  return (
    <main className="flex flex-grow flex-col gap-4">
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

      {dir && (
        <div className="flex flex-col gap-2">
          <p>Folder: {dir.name}</p>

          <ul className="ml-4 list-inside list-disc flex-col">
            {files.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
