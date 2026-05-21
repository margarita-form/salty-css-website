#!/usr/bin/env node
// Walks src/content/docs, runs each (framework, slug) through the same
// templating engine the page route uses, and emits two artifacts:
//
//   src/app/docs/data/docs-index.json   -> consumed by the search modal
//   public/sitemap.xml                  -> sitemap derived from the same matrix
//
// Both outputs are gitignored. The script is invoked via `predev` and
// `prebuild`. It does not watch — restart dev to refresh.

import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const CONTENT_DIR = join(REPO_ROOT, "src/content/docs");
const SNIPPETS_DIR = join(CONTENT_DIR, "snippets");
const INDEX_OUT = join(REPO_ROOT, "src/app/docs/data/docs-index.json");
const SITEMAP_OUT = join(REPO_ROOT, "public/sitemap.xml");
const SITE_ORIGIN = "https://salty-css.dev";

// --- duplicated runtime state -------------------------------------------------
// Kept in sync with src/lib/frameworks.ts and src/app/docs/data/docs-order.ts.
// Keeping the build script standalone (no TS compile step) is the trade-off.

const reactSubpaths = {
  packageRoot: "@salty-css/react",
  styledImport: "@salty-css/react/styled",
  classNameImport: "@salty-css/react/class-name",
  keyframesImport: "@salty-css/react/keyframes",
  configImport: "@salty-css/react/config",
  helpersImport: "@salty-css/react/helpers",
};

const astroSubpaths = {
  packageRoot: "@salty-css/astro",
  styledImport: "@salty-css/astro/styled",
  classNameImport: "@salty-css/astro/class-name",
  keyframesImport: "@salty-css/astro/keyframes",
  configImport: "@salty-css/astro/config",
  helpersImport: "@salty-css/astro/helpers",
};

const FRAMEWORKS = [
  {
    id: "react",
    label: "React",
    family: "react",
    data: {
      installCli: "npm i @salty-css/react",
      bundler: "Vite or Webpack",
      ssrNote: "",
      ...reactSubpaths,
    },
  },
  {
    id: "next",
    label: "Next.js",
    family: "react",
    data: {
      installCli: "npm i @salty-css/next @salty-css/react",
      bundler: "Webpack (Turbopack not yet)",
      ssrNote: "Next App Router supports RSC out of the box.",
      ...reactSubpaths,
    },
  },
  {
    id: "astro",
    label: "Astro",
    family: "astro",
    data: {
      installCli: "npm i @salty-css/astro",
      bundler: "Vite",
      ssrNote: "",
      ...astroSubpaths,
    },
  },
];
const FRAMEWORK_IDS = FRAMEWORKS.map((f) => f.id);

const DOC_ORDER = [
  "",
  "quick-start",
  "installation",
  "usage",
  "troubleshooting",
  "faq",
  "cli",
  "basics",
  "variables",
  "theming",
  "fonts",
  "imports",
  "variants",
  "classnames",
  "overrides",
  "animations",
  "color-function",
  "templates",
  "modifiers",
  "media-queries",
  "viewport-clamp",
  "api/styled",
  "api/classname",
  "api/config",
  "api/define-factories",
];

const DEFAULT_PRIORITIES = {
  "": 0.9,
  "quick-start": 0.9,
  installation: 0.8,
  usage: 0.8,
  basics: 0.8,
  variables: 0.8,
  theming: 0.8,
  templates: 0.8,
  "media-queries": 0.8,
  fonts: 0.7,
  faq: 0.7,
  cli: 0.7,
  variants: 0.7,
  classnames: 0.7,
  overrides: 0.7,
  animations: 0.7,
  troubleshooting: 0.7,
  "viewport-clamp": 0.7,
  "color-function": 0.6,
  imports: 0.6,
  modifiers: 0.6,
  "api/styled": 0.7,
  "api/classname": 0.7,
  "api/config": 0.7,
  "api/define-factories": 0.6,
};

const frameworkData = (id) => {
  const fw = FRAMEWORKS.find((f) => f.id === id);
  return {
    ...fw.data,
    frameworkId: id,
    frameworkLabel: fw.label,
    frameworkFamily: fw.family,
  };
};

// --- frontmatter --------------------------------------------------------------

const ALLOWED_KEYS = new Set([
  "title",
  "description",
  "frameworks",
  "priority",
  "topic",
  "category",
  "schemaType",
  "keywords",
  "intent",
  "proficiencyLevel",
]);

const stripQuotes = (value) => {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
};

const parseInlineArray = (value) => {
  const inner = value.trim().replace(/^\[/, "").replace(/\]$/, "");
  if (!inner.trim()) return [];
  return inner.split(",").map((item) => stripQuotes(item));
};

const parseFrontmatter = (raw) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: { title: "", description: "" }, body: raw };

  const block = match[1];
  const body = raw.slice(match[0].length);
  const data = {};

  for (const line of block.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    if (!ALLOWED_KEYS.has(key)) {
      throw new Error(`Unknown frontmatter key: ${key}`);
    }
    const rawValue = line.slice(colonIdx + 1).trim();

    if (key === "frameworks") {
      data.frameworks = parseInlineArray(rawValue).filter((id) =>
        FRAMEWORK_IDS.includes(id),
      );
    } else if (key === "keywords") {
      data.keywords = parseInlineArray(rawValue).filter(Boolean);
    } else if (key === "priority") {
      const num = Number(rawValue);
      if (!Number.isNaN(num)) data.priority = num;
    } else {
      data[key] = stripQuotes(rawValue);
    }
  }
  return {
    data: {
      title: data.title ?? "",
      description: data.description ?? "",
      frameworks: data.frameworks,
      priority: data.priority,
    },
    body,
  };
};

const applicableFrameworks = (data) =>
  data.frameworks && data.frameworks.length > 0 ? data.frameworks : FRAMEWORK_IDS;

// --- file loading -------------------------------------------------------------

const slugFile = (slug) => (slug === "" ? "index" : slug.replace(/\//g, "-"));

const loadDocSource = async (slug, framework) => {
  const base = slugFile(slug);
  const override = join(CONTENT_DIR, `${base}.${framework}.md`);
  try {
    return { raw: await readFile(override, "utf8"), files: [override] };
  } catch {
    /* fall through */
  }
  const canonical = join(CONTENT_DIR, `${base}.md`);
  return { raw: await readFile(canonical, "utf8"), files: [canonical] };
};

const loadSnippet = async (relPath, snippetFiles) => {
  const file = join(SNIPPETS_DIR, `${relPath}.md`);
  try {
    const raw = await readFile(file, "utf8");
    snippetFiles.push(file);
    return raw;
  } catch {
    return "";
  }
};

// --- template engine (mirrors src/lib/docs-parser.ts) ------------------------

const TOKEN = /\{\{\s*([^{}]+?)\s*\}\}/g;

const resolveVariable = (expression, variables) => {
  const [rawName, ...fallbackParts] = expression.split("||");
  const name = rawName.trim();
  const value = variables[name];
  if (value !== undefined && value !== null && value !== "") return String(value);
  if (fallbackParts.length > 0) {
    const fallback = fallbackParts.join("||").trim();
    return fallback.replace(/^["']|["']$/g, "");
  }
  return "";
};

const renderTemplate = async (body, variables, snippetFiles, maxPasses = 4) => {
  let current = body;
  for (let pass = 0; pass < maxPasses; pass += 1) {
    const matches = Array.from(current.matchAll(TOKEN));
    if (matches.length === 0) return current;

    const replacements = await Promise.all(
      matches.map(async (match) => {
        const expression = match[1].trim();
        if (expression.startsWith("snippet:")) {
          return loadSnippet(
            expression.slice("snippet:".length).trim(),
            snippetFiles,
          );
        }
        if (expression.startsWith("fw-snippet:")) {
          const topic = expression.slice("fw-snippet:".length).trim();
          const fw = variables.frameworkId;
          if (!fw) return "";
          const direct = await loadSnippet(`${topic}/${fw}`, snippetFiles);
          if (direct) return direct;
          const family = variables.frameworkFamily;
          if (!family) return "";
          return loadSnippet(`${topic}/_${family}`, snippetFiles);
        }
        return resolveVariable(expression, variables);
      }),
    );

    let next = "";
    let cursor = 0;
    matches.forEach((match, idx) => {
      const start = match.index ?? 0;
      next += current.slice(cursor, start);
      next += replacements[idx];
      cursor = start + match[0].length;
    });
    next += current.slice(cursor);

    if (next === current) return current;
    current = next;
  }
  return current;
};

// --- search-index helpers -----------------------------------------------------

const collectHeadings = (rendered) => {
  const lines = rendered.split(/\r?\n/);
  const headings = [];
  let inCode = false;
  for (const line of lines) {
    if (line.startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const m = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (m) headings.push(m[2].replace(/`([^`]+)`/g, "$1"));
  }
  return headings;
};

const stripMarkdown = (rendered) => {
  return rendered
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
};

// --- git mtime ----------------------------------------------------------------

let gitAvailable = true;
const gitLastMod = async (files) => {
  let latest = 0;
  for (const file of files) {
    let ts = 0;
    if (gitAvailable) {
      try {
        const out = execFileSync(
          "git",
          ["log", "-1", "--format=%ct", "--", file],
          { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
        ).trim();
        if (out) ts = Number(out) * 1000;
      } catch {
        gitAvailable = false;
      }
    }
    if (!ts) {
      try {
        const s = await stat(file);
        ts = s.mtimeMs;
      } catch {
        /* missing file — skip */
      }
    }
    if (ts > latest) latest = ts;
  }
  return latest > 0 ? new Date(latest).toISOString() : new Date().toISOString();
};

// --- sitemap rendering --------------------------------------------------------

const renderSitemap = (urls) => {
  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
};

// --- main ---------------------------------------------------------------------

const main = async () => {
  const entries = [];
  const urls = [
    {
      loc: `${SITE_ORIGIN}/`,
      lastmod: new Date().toISOString(),
      priority: 1.0,
    },
    {
      loc: `${SITE_ORIGIN}/docs/`,
      lastmod: new Date().toISOString(),
      priority: 0.9,
    },
  ];

  for (const slug of DOC_ORDER) {
    for (const fw of FRAMEWORK_IDS) {
      const { raw, files } = await loadDocSource(slug, fw);
      const { data, body } = parseFrontmatter(raw);
      if (!applicableFrameworks(data).includes(fw)) continue;

      const snippetFiles = [];
      const rendered = await renderTemplate(
        body,
        frameworkData(fw),
        snippetFiles,
      );
      const plain = stripMarkdown(rendered);
      const headings = collectHeadings(rendered);

      entries.push({
        framework: fw,
        slug,
        title: data.title,
        description: data.description,
        headings,
        body: plain,
      });

      const url = `${SITE_ORIGIN}/docs/${fw}/${slug ? `${slug}/` : ""}`;
      urls.push({
        loc: url,
        lastmod: await gitLastMod([...files, ...snippetFiles]),
        priority: data.priority ?? DEFAULT_PRIORITIES[slug] ?? 0.5,
      });
    }
  }

  await mkdir(dirname(INDEX_OUT), { recursive: true });
  await mkdir(dirname(SITEMAP_OUT), { recursive: true });
  await writeFile(INDEX_OUT, JSON.stringify(entries));
  await writeFile(SITEMAP_OUT, renderSitemap(urls));

  console.log(
    `docs-index: ${entries.length} entries -> ${INDEX_OUT}\nsitemap:    ${urls.length} urls    -> ${SITEMAP_OUT}`,
  );
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
