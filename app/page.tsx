"use client";

import { useEffect, useState } from "react";
import { DirectorySelector } from "~/components/directory-selector";
import { ParsedFile, parseFile } from "~/lib/parse-file";

export default function Page() {
  const [dirHandle, setDirHandle] = useState<FileSystemDirectoryHandle>();
  const [parsedFiles, setParsedFiles] = useState<ParsedFile[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    if (!dirHandle) return;

    (async () => {
      const files: ParsedFile[] = [];
      for await (const entry of dirHandle.values()) {
        if (entry.kind === "file") {
          files.push(await parseFile(entry));
        }
      }

      const dataKeys = new Set<string>();
      for (const file of files) {
        const data = file.data;
        for (const key in data) {
          dataKeys.add(key);
        }
      }

      setColumns(Array.from(dataKeys));
      setParsedFiles(files);
    })();
  }, [dirHandle]);

  return (
    <main className="flex flex-grow flex-col gap-4">
      {dirHandle ? (
        <div className="flex flex-col gap-2">
          <p>Folder: {dirHandle.name}</p>
          <p>Files: {parsedFiles.length}</p>
          <p>Columns: {JSON.stringify(columns)}</p>

          <ul className="ml-4 list-inside list-disc flex-col">
            {parsedFiles.map((file) => (
              <li key={file.name}>
                <div className="inline-flex flex-col gap-2">
                  {file.name}
                  {/* <div className="mb-4 whitespace-pre rounded-lg bg-secondary p-4 font-mono text-xs">
                    {JSON.stringify(file.data, null, 2)}
                  </div> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <DirectorySelector setDirHandle={setDirHandle} />
      )}
    </main>
  );
}
