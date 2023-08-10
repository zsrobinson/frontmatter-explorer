# Frontmatter Explorer

<center><i>insert screenshot here eventually</i></center>

## About this project

I was really torn between [Notion](https://www.notion.so/) and [Obsidian](https://obsidian.md/) when trying to pick a notes app going into college. I think that Notion [databases](https://www.notion.so/help/intro-to-databases) are really neat, but I ultimately went with Obsidian because it's all just markdown files stored locally on your own computer. But what if I want a similar experience to Notion databases for Obsidian? Markdown files are able to store data using [YAML Frontmatter](https://daily-dev-tips.com/posts/what-exactly-is-frontmatter/), but the only way to query all of this data is the [Dataview plugin](https://github.com/blacksmithgu/obsidian-dataview) for Obsidian. Don't get me wrong, the Dataview plugin is really cool -- but it's not exactly what I think of when I think of Notion databases. After finding out about the new-ish [File System Access API](https://developer.chrome.com/articles/file-system-access/), I figured that I'd give it a shot.

This tool assumes that all of the markdown files within a directory are of the same "schema", which means that their frontmatter roughly follows the same shape. It will go through each file in the directory that you select and parse the frontmatter, looking for unique data fields. THen, it will display all of this data in a table.

This project is very much a work in progress. Creating editable tables doesn't seem very easy, so it might take a little bit to get this working how I expect it to.

As I mentioned, this project relies on the File System Access API which is [not yet fully implemented in all major browsers](https://developer.mozilla.org/en-US/docs/Web/API/Window/showDirectoryPicker#browser_compatibility) (just Chromium-based browsers as of writing). I started this project more or less as an excuse to get to experiment with this new API which seemed really promising. It's worth mentioning that all of the processing that this website does happens locally in your own browser. At no point does this website send your files to any remote source. You're welcome to verify this by browsing the source code and/or cloning this repo and hosting the project locally to _really_ be sure.

## How to run this tool locally

First, make sure you have node package manager (NPM) installed on your system. After cloning this repo, run `npm install` and `npm run dev` in the root of the project. Navigate to `http://localhost:3000` in your browser, and use the site just as you would the public version.
