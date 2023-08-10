"use client";

import type { ParsedFile } from "~/lib/parse-file";
import { Button } from "./ui/button";

type Props = {
  parsedFiles: ParsedFile[];
} & React.ComponentPropsWithoutRef<typeof Button>;

export function DownloadJSONButton({ parsedFiles, ...rest }: Props) {
  return (
    <Button
      variant="outline"
      onClick={async () => {
        // remove the content field
        const fileContents = parsedFiles.map((file) => {
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
      }}
      {...rest}
    >
      Download as JSON
    </Button>
  );
}
