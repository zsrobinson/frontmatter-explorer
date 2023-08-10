"use client";

import { useEffect, useState } from "react";
import { DirectorySelector } from "~/components/directory-selector";
import { TableData, TableHead, TableHeader } from "~/components/table";
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

          <table className="table-auto">
            <TableHead>
              <TableHeader>file-name</TableHeader>
              {columns.map((column) => (
                <TableHeader key={column}>{column}</TableHeader>
              ))}
            </TableHead>
            <tbody>
              {parsedFiles.map((file) => (
                <tr key={file.name}>
                  <TableData data={file.name} />
                  {columns.map((column) => (
                    <TableData data={file.data[column]} key={column} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <DirectorySelector setDirHandle={setDirHandle} />
      )}
    </main>
  );
}
