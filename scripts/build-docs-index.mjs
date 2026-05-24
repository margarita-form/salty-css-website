#!/usr/bin/env node
// Walks src/content/docs, runs each (framework, slug) through the same
// templating engine the page route uses, and emits three artifacts:
//
//   src/app/docs/data/docs-index.json   -> consumed by the search modal
//   public/sitemap.xml                  -> sitemap derived from the same matrix
//   public/llms.txt                     -> llms.txt summary for AI agents
//
// All outputs are gitignored. The script is invoked via `predev` and
// `prebuild`. It does not watch — restart dev to refresh.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const CONTENT_DIR = join(REPO_ROOT, "src/content/docs");
const SNIPPETS_DIR = join(CONTENT_DIR, "snippets");
const INDEX_OUT = join(REPO_ROOT, "src/app/docs/data/docs-index.json");
const SITEMAP_OUT = join(REPO_ROOT, "public/sitemap.xml");
const LLMS_OUT = join(REPO_ROOT, "public/llms.txt");
const HASH_MANIFEST = join(REPO_ROOT, ".next/cache/sitemap-hashes.json");
const SITE_ORIGIN = "https://salty-css.dev";

// Mirrors `export const metadata` in src/app/{,react,next,astro}/page.tsx.
// Kept here so the build script stays standalone (no TS evaluation step).
const TOP_LEVEL_PAGES = [
  {
    path: "/",
    title: "Salty CSS",
    description:
      "Build time CSS-in-JS library compatible with React, Next.js, Vite and React Server Components built with TypeScript.",
    sourceFile: join(REPO_ROOT, "src/app/page.tsx"),
  },
  {
    path: "/react/",
    title: "Salty CSS for React",
    description:
      "Sprinkle Salty CSS on your React app — build-time CSS-in-TS that ships zero runtime.",
    sourceFile: join(REPO_ROOT, "src/app/react/page.tsx"),
  },
  {
    path: "/next/",
    title: "Salty CSS for Next.js",
    description:
      "Salty CSS served fresh from the App Router — zero-runtime styles that work with React Server Components.",
    sourceFile: join(REPO_ROOT, "src/app/next/page.tsx"),
  },
  {
    path: "/astro/",
    title: "Salty CSS for Astro",
    description:
      "Astro plus a pinch of salt — the same styled API in .astro files and React islands, extracted to plain CSS at build time.",
    sourceFile: join(REPO_ROOT, "src/app/astro/page.tsx"),
  },
];

const DOCS_INDEX_PAGE = {
  path: "/docs/",
  priority: 0.9,
  sourceFile: join(REPO_ROOT, "src/app/docs/data/docs-order.ts"),
};

const LLMS_EXTERNAL_LINKS = [
  {
    title: "Source on GitHub",
    url: "https://github.com/margarita-form/salty-css",
    description:
      "Monorepo for @salty-css/* packages — file issues, browse source, follow the alpha changelog.",
  },
  {
    title: "Community Discord",
    url: "https://discord.gg/R6kr4KxMhP",
    description: "Chat with maintainers and other Salty CSS users.",
  },
  {
    title: "@salty-css/core on npm",
    url: "https://www.npmjs.com/package/@salty-css/core",
    description: "The compiler package — published as alpha (^0.1.0-alpha.0).",
  },
];

const FRAMEWORK_LABEL = {
  react: "React",
  next: "Next.js",
  astro: "Astro",
};

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
  runtimeImport: "@salty-css/react/runtime",
};

const astroSubpaths = {
  packageRoot: "@salty-css/astro",
  styledImport: "@salty-css/astro/styled",
  classNameImport: "@salty-css/astro/class-name",
  keyframesImport: "@salty-css/astro/keyframes",
  configImport: "@salty-css/astro/config",
  helpersImport: "@salty-css/astro/helpers",
  runtimeImport: "@salty-css/astro/runtime",
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
  "api/runtime",
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
  "api/runtime": 0.6,
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
  "preHeadline",
  "visibleHeading",
  "frameworks",
  "priority",
  "topic",
  "category",
  "schemaType",
  "keywords",
  "intent",
  "proficiencyLevel",
]);

const BLOCK_SCALAR_INDICATORS = new Set([">", ">-", ">+", "|", "|-", "|+"]);

const readBlockScalar = (indicator, lines, startIdx) => {
  const collected = [];
  let i = startIdx;
  let baseIndent = null;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") {
      collected.push("");
      i += 1;
      continue;
    }
    const indentMatch = line.match(/^(\s+)/);
    if (!indentMatch) break;
    const indent = indentMatch[1].length;
    if (baseIndent === null) baseIndent = indent;
    if (indent < baseIndent) break;
    collected.push(line.slice(baseIndent));
    i += 1;
  }
  while (collected.length && collected[collected.length - 1] === "") {
    collected.pop();
  }
  const folded = indicator.startsWith(">");
  let value;
  if (folded) {
    value = collected
      .reduce((acc, line) => {
        if (line === "") {
          acc.push("\n");
        } else if (acc.length === 0 || acc[acc.length - 1].endsWith("\n")) {
          acc.push(line);
        } else {
          acc[acc.length - 1] += " " + line;
        }
        return acc;
      }, [])
      .join("");
  } else {
    value = collected.join("\n");
  }
  return { value: value.replace(/\n+$/, ""), nextIdx: i };
};

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

  const lines = block.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    if (!ALLOWED_KEYS.has(key)) {
      throw new Error(`Unknown frontmatter key: ${key}`);
    }
    let rawValue = line.slice(colonIdx + 1).trim();

    if (BLOCK_SCALAR_INDICATORS.has(rawValue)) {
      const { value, nextIdx } = readBlockScalar(rawValue, lines, i + 1);
      rawValue = value;
      i = nextIdx - 1;
    }

    // Empty inline value followed by indented lines = nested map (e.g.
    // per-framework seoHeadline). The script doesn't consume these values;
    // skip past the indented block without parsing it.
    if (rawValue === "") {
      let j = i + 1;
      while (j < lines.length && lines[j].trim() === "") j += 1;
      if (j < lines.length && /^\s/.test(lines[j])) {
        const baseIndent = lines[j].match(/^(\s+)/)[1].length;
        while (j < lines.length) {
          const peek = lines[j];
          if (peek.trim() === "") {
            j += 1;
            continue;
          }
          const m = peek.match(/^(\s+)/);
          if (!m || m[1].length < baseIndent) break;
          j += 1;
        }
        i = j - 1;
        continue;
      }
    }

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

// --- content-hash manifest ---------------------------------------------------
// Detects whether a URL's *rendered output* changed since the last build.
// Persisted in .next/cache/ so Vercel and most CI providers preserve it
// between builds without extra configuration.

const MANIFEST_VERSION = 1;

const contentHash = (parts) => {
  const h = createHash("sha256");
  h.update(parts.join("\n"));
  return h.digest("hex").slice(0, 16);
};

const readPriorManifest = async () => {
  try {
    const raw = await readFile(HASH_MANIFEST, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed?.version === MANIFEST_VERSION && parsed.urls) return parsed.urls;
  } catch {
    /* fall through */
  }
  console.warn(
    `[sitemap] no prior hash manifest at ${HASH_MANIFEST} — stamping all URLs as changed`,
  );
  return {};
};

const writeManifest = async (urls) => {
  await mkdir(dirname(HASH_MANIFEST), { recursive: true });
  await writeFile(
    HASH_MANIFEST,
    JSON.stringify({ version: MANIFEST_VERSION, urls }, null, 2),
  );
};

const resolveLastmod = (loc, hash, prior, nowIso) => {
  const previous = prior[loc];
  if (previous?.hash === hash) return previous.lastmod;
  return nowIso;
};

// --- llms.txt rendering -------------------------------------------------------

const LLMS_OPTIONAL_THRESHOLD = 0.7;

const llmsBullet = ({ title, url, description }) =>
  description
    ? `- [${title}](${url}): ${description}`
    : `- [${title}](${url})`;

const renderLlmsTxt = (topLevel, docsByFramework) => {
  const out = [];
  out.push("# Salty CSS");
  out.push("");
  out.push(
    "> Build-time CSS-in-TS for React, Next.js and Astro. Compiles `styled(...)` calls",
  );
  out.push(
    "> in `*.css.ts` files to plain CSS at build time — zero runtime cost, with full",
  );
  out.push(
    "> TypeScript autocomplete on design tokens, themes, variants and media queries.",
  );
  out.push("> Works with React Server Components.");
  out.push("");
  out.push(
    "Salty CSS is currently in public alpha (`@salty-css/* ^0.1.0-alpha.0`); expect",
  );
  out.push(
    "minor breaking changes between releases. It is not a fork of vanilla-extract,",
  );
  out.push("stitches or Linaria — it has its own compiler and API.");
  out.push("");
  out.push(
    "The documentation set is mirrored across the React, Next.js and Astro sections",
  );
  out.push(
    "below. The three are translations of the same content with framework-specific",
  );
  out.push("install steps and code snippets — pick the section that matches your stack.");
  out.push("");

  out.push("## Overview");
  for (const page of topLevel) {
    out.push(
      llmsBullet({
        title: page.title,
        url: `${SITE_ORIGIN}${page.path}`,
        description: page.description,
      }),
    );
  }
  out.push("");

  const optionalDocs = [];
  for (const fwId of FRAMEWORK_IDS) {
    const docs = docsByFramework[fwId] ?? [];
    const main = [];
    for (const doc of docs) {
      if (doc.priority < LLMS_OPTIONAL_THRESHOLD) {
        optionalDocs.push({ ...doc, fwLabel: FRAMEWORK_LABEL[fwId] });
      } else {
        main.push(doc);
      }
    }
    out.push(`## Documentation (${FRAMEWORK_LABEL[fwId]})`);
    for (const doc of main) {
      out.push(
        llmsBullet({
          title: doc.title,
          url: doc.url,
          description: doc.description,
        }),
      );
    }
    out.push("");
  }

  out.push("## Optional");
  for (const doc of optionalDocs) {
    out.push(
      llmsBullet({
        title: `${doc.title} (${doc.fwLabel})`,
        url: doc.url,
        description: doc.description,
      }),
    );
  }
  for (const link of LLMS_EXTERNAL_LINKS) {
    out.push(llmsBullet(link));
  }
  out.push("");
  return out.join("\n");
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

const hashTopLevelPage = async (page) => {
  const source = await readFile(page.sourceFile, "utf8");
  return contentHash([page.path, page.title ?? "", page.description ?? "", source]);
};

const main = async () => {
  const priorManifest = await readPriorManifest();
  const nowIso = new Date().toISOString();
  const newManifest = {};

  const entries = [];
  const docsByFramework = Object.fromEntries(FRAMEWORK_IDS.map((id) => [id, []]));
  const urls = [];

  const rootLoc = `${SITE_ORIGIN}/`;
  const rootPage = TOP_LEVEL_PAGES.find((p) => p.path === "/");
  const rootHash = await hashTopLevelPage(rootPage);
  const rootLastmod = resolveLastmod(rootLoc, rootHash, priorManifest, nowIso);
  newManifest[rootLoc] = { hash: rootHash, lastmod: rootLastmod };
  urls.push({ loc: rootLoc, lastmod: rootLastmod, priority: 1.0 });

  const docsIndexLoc = `${SITE_ORIGIN}${DOCS_INDEX_PAGE.path}`;
  const docsIndexSource = await readFile(DOCS_INDEX_PAGE.sourceFile, "utf8");
  const docsIndexHash = contentHash([DOCS_INDEX_PAGE.path, docsIndexSource]);
  const docsIndexLastmod = resolveLastmod(
    docsIndexLoc,
    docsIndexHash,
    priorManifest,
    nowIso,
  );
  newManifest[docsIndexLoc] = { hash: docsIndexHash, lastmod: docsIndexLastmod };
  urls.push({
    loc: docsIndexLoc,
    lastmod: docsIndexLastmod,
    priority: DOCS_INDEX_PAGE.priority,
  });

  for (const page of TOP_LEVEL_PAGES) {
    if (page.path === "/") continue;
    const loc = `${SITE_ORIGIN}${page.path}`;
    const hash = await hashTopLevelPage(page);
    const lastmod = resolveLastmod(loc, hash, priorManifest, nowIso);
    newManifest[loc] = { hash, lastmod };
    urls.push({ loc, lastmod, priority: 0.8 });
  }

  for (const slug of DOC_ORDER) {
    for (const fw of FRAMEWORK_IDS) {
      const { raw } = await loadDocSource(slug, fw);
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

      const loc = `${SITE_ORIGIN}/docs/${fw}/${slug ? `${slug}/` : ""}`;
      const priority = data.priority ?? DEFAULT_PRIORITIES[slug] ?? 0.5;
      const hash = contentHash([
        data.title ?? "",
        data.description ?? "",
        String(priority),
        rendered,
        headings.join("|"),
      ]);
      const lastmod = resolveLastmod(loc, hash, priorManifest, nowIso);
      newManifest[loc] = { hash, lastmod };
      urls.push({ loc, lastmod, priority });
      docsByFramework[fw].push({
        slug,
        title: data.title,
        description: data.description,
        priority,
        url: loc,
      });
    }
  }

  await mkdir(dirname(INDEX_OUT), { recursive: true });
  await mkdir(dirname(SITEMAP_OUT), { recursive: true });
  await mkdir(dirname(LLMS_OUT), { recursive: true });
  await writeFile(INDEX_OUT, JSON.stringify(entries));
  await writeFile(SITEMAP_OUT, renderSitemap(urls));
  const llmsTxt = renderLlmsTxt(TOP_LEVEL_PAGES, docsByFramework);
  await writeFile(LLMS_OUT, llmsTxt);
  await writeManifest(newManifest);

  const llmsLinkCount = (llmsTxt.match(/^- \[/gm) ?? []).length;
  console.log(
    `docs-index: ${entries.length} entries -> ${INDEX_OUT}\nsitemap:    ${urls.length} urls    -> ${SITEMAP_OUT}\nllms.txt:   ${llmsLinkCount} links   -> ${LLMS_OUT}`,
  );
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
