"use client";

import { ComponentPropsWithoutRef, ReactNode } from "react";
import type { ParsedFile } from "~/lib/parse-file";

type LayoutProps = { children: ReactNode };

type TableDataProps = { data: ParsedFile["data"][string] };

export function TableData({ data }: TableDataProps) {
  const className = "px-3 py-1 whitespace-pre";

  if (data === undefined || (Array.isArray(data) && data.length === 0)) {
    return <td className={className + " italic text-secondary"}>&ndash;</td>;
  }

  if (typeof data === "string") {
    return <td className={className}>{data}</td>;
  }

  if (typeof data === "number") {
    return <td className={className}>{data}</td>;
  }

  if (typeof data === "boolean") {
    return <td className={className}>{data.toString()}</td>;
  }

  if (Array.isArray(data)) {
    return (
      <td className={className}>
        {data.map((v) => (
          <div key={v}>{v}</div>
        ))}
      </td>
    );
  }

  return <td className={className}>{JSON.stringify(data, null, 2)}</td>;
}

type TableHeaderProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"th">;

export function TableHeader({ children, ...rest }: TableHeaderProps) {
  return (
    <th
      className="bg-secondary px-3 py-1 first:rounded-l-lg last:rounded-r-lg"
      {...rest}
    >
      {children}
    </th>
  );
}

export function TableHead({ children }: LayoutProps) {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
}
