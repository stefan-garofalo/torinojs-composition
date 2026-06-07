import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const wikiRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = path.join(wikiRoot, "content", "docs");

const possibleRepoRoots = [path.resolve(wikiRoot, "..", ".."), path.resolve(wikiRoot, "..")];

const repoRoot = possibleRepoRoots.find(
  (candidate) =>
    existsSync(path.join(candidate, "docs")) || existsSync(path.join(candidate, "package.json")),
);

const copiedTopLevelPages = new Set(["project"]);

syncTree(path.join(wikiRoot, "specs"), path.join(contentRoot, "project", "specs"), "Specs");

if (repoRoot) {
  syncTree(
    path.join(repoRoot, "docs", "requirements"),
    path.join(contentRoot, "project", "requirements"),
    "Requirements",
  );
  syncTree(
    path.join(repoRoot, "docs", "reference"),
    path.join(contentRoot, "project", "reference"),
    "Reference",
  );
  syncTree(
    path.join(repoRoot, "docs", "runbooks"),
    path.join(contentRoot, "project", "runbooks"),
    "Runbooks",
  );
  syncFile(
    path.join(repoRoot, "docs", "tech-decisions.md"),
    path.join(contentRoot, "project", "decisions", "tech-decisions.mdx"),
  );
}

mergeMeta(contentRoot, {
  title: "Project Docs",
  pages: Array.from(copiedTopLevelPages),
});

mergeMeta(path.join(contentRoot, "project"), {
  title: "Project",
  description: "Internal project operations",
  pages: [
    "index",
    "domains",
    "grilling",
    "specs",
    "tech-debt",
    "maintenance",
    "runbooks",
    "decisions",
    "repo-guidance",
    ...(existsSync(path.join(contentRoot, "project", "requirements")) ? ["requirements"] : []),
    ...(existsSync(path.join(contentRoot, "project", "reference")) ? ["reference"] : []),
  ],
});

function syncTree(sourceDirectory, targetDirectory, title) {
  if (!existsSync(sourceDirectory)) return;

  copyMarkdownTree(sourceDirectory, targetDirectory);
  writeMetaTree(targetDirectory, title);

  const relativeTarget = path.relative(contentRoot, targetDirectory);
  const topLevel = relativeTarget.split(path.sep)[0];
  if (topLevel) copiedTopLevelPages.add(topLevel);
}

function copyMarkdownTree(sourceDirectory, targetDirectory) {
  for (const entry of readdirSync(sourceDirectory, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;

    const sourcePath = path.join(sourceDirectory, entry.name);
    const targetPath = path.join(targetDirectory, entry.name);

    if (entry.isDirectory()) {
      copyMarkdownTree(sourcePath, targetPath);
      continue;
    }

    if (!entry.isFile()) continue;
    if (!entry.name.endsWith(".md") && !entry.name.endsWith(".mdx")) continue;

    syncFile(sourcePath, targetPath);
  }
}

function syncFile(sourcePath, targetPath) {
  if (!existsSync(sourcePath)) return;
  if (existsSync(targetPath) && hasFrontmatter(readFileSync(targetPath, "utf8"))) return;

  mkdirSync(path.dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, sanitizeMdx(readFileSync(sourcePath, "utf8"), targetPath));
}

function hasFrontmatter(content) {
  return content.startsWith("---\n");
}

function writeMetaTree(directory, title) {
  if (!existsSync(directory)) return;

  const entries = readdirSync(directory, { withFileTypes: true }).filter(
    (entry) => !entry.name.startsWith("."),
  );
  const files = entries
    .filter(
      (entry) => entry.isFile() && (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")),
    )
    .map((entry) => stripMarkdownExtension(entry.name))
    .filter((name) => name !== "meta");
  const folders = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  const pages = orderPages([...files, ...folders]);

  if (pages.length > 0) mergeMeta(directory, { title, pages });

  for (const folder of folders) {
    writeMetaTree(path.join(directory, folder), titleFromSegment(folder));
  }
}

function mergeMeta(directory, nextMeta) {
  mkdirSync(directory, { recursive: true });

  const metaPath = path.join(directory, "meta.json");
  const existing = readJson(metaPath);
  const mergedPages = mergePages(existing.pages ?? [], nextMeta.pages);

  writeFileSync(
    metaPath,
    formatMetaJson({
      ...nextMeta,
      ...existing,
      pages: mergedPages,
    }),
  );
}

function formatMetaJson(meta) {
  const lines = Object.entries(meta).map(
    ([key, value]) => '  "' + key + '": ' + JSON.stringify(value),
  );

  return "{\n" + lines.join(",\n") + "\n}\n";
}

function readJson(filePath) {
  if (!existsSync(filePath)) return {};

  return JSON.parse(readFileSync(filePath, "utf8"));
}

function orderPages(pages) {
  return mergePages([], pages).sort((left, right) => {
    if (left === "index") return -1;
    if (right === "index") return 1;

    return left.localeCompare(right);
  });
}

function mergePages(existingPages, nextPages) {
  const existing = Array.isArray(existingPages) ? existingPages : [];
  const additions = nextPages.filter((page) => !existing.includes(page));
  const pages = [...existing, ...additions];

  if (!pages.includes("index")) return pages;

  return ["index", ...pages.filter((page) => page !== "index")];
}

function stripMarkdownExtension(fileName) {
  return fileName.replace(/\.mdx?$/, "");
}

function titleFromSegment(segment) {
  return segment
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function sanitizeMdx(content, targetPath) {
  const sanitized = content.replace(/<([A-Z_][A-Z0-9_-]*)>/g, "\\<$1\\>");
  if (hasFrontmatter(sanitized)) return sanitized;

  return [
    "---",
    'title: "' + titleFromDocument(sanitized, targetPath) + '"',
    "surface: project",
    "permission: project",
    "---",
    "",
    sanitized,
  ].join("\n");
}

function titleFromDocument(content, targetPath) {
  const heading = content.match(/^#\s+(.+)$/m)?.[1]?.trim();
  if (heading) return heading.replace(/"/g, '\\"');

  return titleFromSegment(stripMarkdownExtension(path.basename(targetPath))).replace(/"/g, '\\"');
}

if (repoRoot) {
  const displayedRoot = path.relative(wikiRoot, repoRoot) || ".";
  console.log(`Synced wiki content from ${displayedRoot}`);
} else {
  console.log("No repository root detected; using checked-in wiki content.");
}
