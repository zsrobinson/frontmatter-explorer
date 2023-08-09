import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import {
  IconHeart,
  IconList,
  IconMarkdown,
  IconTable,
  IconTableOptions,
} from "@tabler/icons-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frontmatter Explorer",
  description: "Table editor for YAML frontmatter data",
};

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="mx-auto flex min-h-screen max-w-5xl flex-col p-8">
        <header className="flex items-center gap-2">
          <Link href="/" tabIndex={-1}>
            <IconTableOptions size={48} />
          </Link>

          <div>
            <Link href="/">
              <h1 className="text-2xl font-bold">Frontmatter Explorer</h1>
            </Link>

            <p className="text-muted-foreground">
              Table editor for YAML frontmatter data
            </p>
          </div>
        </header>

        <hr className="border-border my-4" />

        {children}

        <hr className="border-border my-4 mt-16" />

        <footer className="flex flex-col items-center gap-2">
          <p className="text-muted-foreground text-center">
            Made with <IconHeart size={16} className="mb-1 inline" /> by{" "}
            <a
              href="https://zsrobinson.com/"
              target="_blank"
              className="hover:text-muted-foreground/80 underline underline-offset-2 transition-colors"
            >
              Zachary Robinson
            </a>{" "}
            · View this project on{" "}
            <a
              href="https://github.com/zsrobinson/frontmatter-explorer/"
              target="_blank"
              className="hover:text-muted-foreground/80 underline underline-offset-2 transition-colors"
            >
              GitHub
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
