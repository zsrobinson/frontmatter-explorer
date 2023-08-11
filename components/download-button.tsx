"use client";

import type { ComponentPropsWithoutRef } from "react";
import type { ParsedFile } from "~/lib/parse-file";
import { Button } from "./ui/button";

type DownloadButtonProps = {
  files: ParsedFile[];
} & ComponentPropsWithoutRef<typeof Button>;

export function DownloadJSONButton({ files, ...rest }: DownloadButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={async () => {
        try {
          // remove the content field
          const fileContents = files.map((file) => {
            const { content, ...rest } = file;
            return rest;
          });

          const handle = await window.showSaveFilePicker({
            suggestedName: "frontmatter.json",
            types: [{ accept: { "application/json": [".json"] } }],
          });

          const writableStream = await handle.createWritable();
          await writableStream.write(JSON.stringify(fileContents));
          await writableStream.close();
        } catch {}
      }}
      {...rest}
    >
      Download as JSON
    </Button>
  );
}
