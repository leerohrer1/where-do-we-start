import fs from "fs";
import path from "path";

export type BlogPost = {
  metadata: Metadata;
  slug: string;
  content: string;
  lastModified: string;
};

type Metadata = {
  title: string;
  postNumber: number;
  summary: string;
  image?: string;
};

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    let [field, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    let key = field.trim() as keyof Metadata;
    if (key === "postNumber") {
      metadata.postNumber = Number(value);
    } else if (key === "title" || key === "summary" || key === "image") {
      metadata[key] = value;
    }
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let filePath = path.join(dir, file);
    let { metadata, content } = readMDXFile(filePath);
    let slug = path.basename(file, path.extname(file));
    let lastModified = fs.statSync(filePath).mtime.toISOString().split("T")[0];

    return {
      metadata,
      slug,
      content,
      lastModified,
    };
  });
}

export function getBlogPosts(): BlogPost[] {
  return getMDXData(path.join(process.cwd(), "app", "blog", "posts"));
}

export function formatPostLabel(postNumber: number) {
  return `post ${String(postNumber).padStart(3, "0")}`;
}

export function sortPostsByNumber(posts: BlogPost[], newestFirst = true) {
  return [...posts].sort((a, b) => {
    if (a.metadata.postNumber > b.metadata.postNumber) {
      return newestFirst ? -1 : 1;
    }
    if (a.metadata.postNumber < b.metadata.postNumber) {
      return newestFirst ? 1 : -1;
    }
    return 0;
  });
}
