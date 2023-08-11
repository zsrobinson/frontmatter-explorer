"use client";

import { IconArrowDown } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { DownloadJSONButton } from "~/components/download-button";
import { SelectorButton } from "~/components/selector-button";
import { TableData, TableHead, TableHeader } from "~/components/table";
import { ParsedFile, parseFile } from "~/lib/parse-file";
import { kebabToSentence } from "~/lib/utils";

export default function Page() {
  const [dirHandle, setDirHandle] = useState<FileSystemDirectoryHandle>();
  const [parsedFiles, setParsedFiles] = useState<ParsedFile[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const unsupported =
    typeof window !== "undefined" && !window.showDirectoryPicker;

  useEffect(() => {
    if (!dirHandle) return;

    (async () => {
      const files: ParsedFile[] = [];
      for await (const entry of dirHandle.values()) {
        if (entry.kind !== "file") continue;
        if (entry.name.startsWith(".")) continue;
        files.push(await parseFile(entry));
      }

      files.sort((a, b) => a.name.localeCompare(b.name));

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
    <main className="flex flex-grow flex-col items-start gap-4">
      <div className="flex gap-4">
        <SelectorButton
          setDirHandle={setDirHandle}
          variant={dirHandle ? "secondary" : "default"}
          disabled={unsupported}
        />

        {dirHandle && (
          <DownloadJSONButton files={parsedFiles} variant="outline" />
        )}
      </div>

      {dirHandle && (
        <div className="flex flex-col gap-2">
          <p>Folder: {dirHandle.name}</p>

          <table className="table-auto">
            <TableHead>
              <TableHeader title="file-name">
                File Name
                <IconArrowDown size={18} className="mb-[3px] ml-1 inline" />
              </TableHeader>

              {columns.map((column) => (
                <TableHeader key={column} title={column}>
                  {kebabToSentence(column)}
                </TableHeader>
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
      )}

      {unsupported && (
        <p>
          Please use a browser that supports the File System Access API. Refer
          to{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Window/showDirectoryPicker#browser_compatibility"
            className="underline underline-offset-2 transition-colors hover:text-primary/80"
            target="_blank"
          >
            this list
          </a>{" "}
          for browsers that are supported.
        </p>
      )}
    </main>
  );
}
