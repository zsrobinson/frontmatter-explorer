import matter from "gray-matter";
import { useEffect, useState } from "react";

type Props = { handle: FileSystemFileHandle; className?: string };

export function FileContentPreview({ handle, className }: Props) {
  const [data, setData] = useState<string>();
  const [content, setContent] = useState<string>();

  useEffect(() => {
    (async () => {
      const file = await handle.getFile();
      const fileContents = await file.text();
      const { data, content } = matter(fileContents);
      setData(JSON.stringify(data, null, 2));
      setContent(content);
    })();
  }, [handle]);

  return (
    <>
      <div
        className={`whitespace-pre rounded-lg bg-secondary p-4 font-mono text-xs ${className}`}
      >
        {data}
      </div>

      <div
        className={`whitespace-pre rounded-lg bg-secondary p-4 font-mono text-xs ${className}`}
      >
        {content}
      </div>
    </>
  );
}
