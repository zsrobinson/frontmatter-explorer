import { useEffect, useState } from "react";

type Props = { handle: FileSystemFileHandle; className?: string };

export function FileContentPreview({ handle, className }: Props) {
  const [contents, setContents] = useState<string>();

  useEffect(() => {
    (async () => {
      const file = await handle.getFile();
      const fileContents = await file.text();
      setContents(fileContents);
    })();
  }, [handle]);

  return (
    <div
      className={`whitespace-pre rounded-lg bg-secondary p-4 font-mono text-xs ${className}`}
    >
      {contents}
    </div>
  );
}
