import matter from "gray-matter";

export type ParsedFile = {
  data: { [key: string]: any };
  content: string;
  name: string;
  type: string;
};

export async function parseFile(handle: FileSystemFileHandle) {
  const file = await handle.getFile();
  const fileContents = await file.text();

  const { data, content } = matter(fileContents);

  return {
    data,
    content,
    name: handle.name,
    type: file.type,
  };
}
