"use client";

import { useState } from "react";
import { DirectorySelector } from "~/components/directory-selector";
import { FileContentPreview } from "~/components/file-content-preview";

export default function Page() {
  const [dir, setDir] = useState<FileSystemDirectoryHandle>();
  const [files, setFiles] = useState<FileSystemFileHandle[]>([]);

  return (
    <main className="flex flex-grow flex-col gap-4">
      {dir ? (
        <div className="flex flex-col gap-2">
          <p>Folder: {dir.name}</p>

          <ul className="ml-4 list-inside list-disc flex-col">
            {files.map((file) => (
              <li key={file.name}>
                <div className="inline-flex flex-col gap-2 pb-4">
                  {file.name}
                  <FileContentPreview handle={file} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <DirectorySelector setDir={setDir} setFiles={setFiles} />
      )}
    </main>
  );
}
