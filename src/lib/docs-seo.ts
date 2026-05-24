import {
  FRAMEWORK_IDS,
  frameworkData,
  frameworkLabel,
  type FrameworkId,
} from "./frameworks";
import type {
  DocCategory,
  DocFrontmatter,
  ProficiencyLevel,
  SchemaType,
} from "./docs-content";
export const SITE_ORIGIN = "https://salty-css.dev";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/assets/banners/salty-css-meta-default.jpg`;
const REPO_URL = "https://github.com/margarita-form/salty-css";
const NPM_URL = "https://www.npmjs.com/package/@salty-css/core";
const DISCORD_URL = "https://discord.gg/R6kr4KxMhP";

export const canonicalPathFor = (
  framework: FrameworkId,
  slug: string,
): string => `/docs/${framework}/${slug ? `${slug}/` : ""}`;

export const canonicalUrlFor = (
  framework: FrameworkId,
  slug: string,
): string => `${SITE_ORIGIN}${canonicalPathFor(framework, slug)}`;

const defaultTopicFromTitle = (title: string): string =>
  title.split("~")[0].trim();

export const resolveTopic = (data: DocFrontmatter): string =>
  data.topic?.trim() || defaultTopicFromTitle(data.title) || "Documentation";

export const resolveCategory = (data: DocFrontmatter): DocCategory =>
  data.category ?? "guide";

export const resolveSchemaType = (data: DocFrontmatter): SchemaType => {
  if (data.schemaType) return data.schemaType;
  switch (data.category) {
    case "api-reference":
      return "APIReference";
    case "faq":
      return "FAQPage";
    case "tutorial":
      return "TechArticle";
    default:
      return "TechArticle";
  }
};

export const resolveIntent = (data: DocFrontmatter): string =>
  (data.intent || data.description || "").trim();

export const resolveProficiency = (
  data: DocFrontmatter,
): ProficiencyLevel => data.proficiencyLevel ?? "Beginner";

const resolvePerFrameworkText = (
  value: DocFrontmatter["preHeadline"],
  framework: FrameworkId,
  fieldName: string,
  fileLabel: string,
): string => {
  if (typeof value === "string") return value;
  const perFramework = value[framework];
  if (!perFramework || !perFramework.trim()) {
    throw new Error(
      `${fileLabel}: ${fieldName} is a per-framework map but no value for "${framework}". ` +
        `Add a hand-crafted ${fieldName}.${framework} entry to the frontmatter.`,
    );
  }
  return perFramework;
};

export const resolvePreHeadline = (
  data: DocFrontmatter,
  framework: FrameworkId,
  fileLabel: string,
): string =>
  resolvePerFrameworkText(data.preHeadline, framework, "preHeadline", fileLabel);

export const resolveVisibleHeading = (
  data: DocFrontmatter,
  framework: FrameworkId,
  fileLabel: string,
): string =>
  resolvePerFrameworkText(
    data.visibleHeading,
    framework,
    "visibleHeading",
    fileLabel,
  );

interface TemplateArgs {
  topic: string;
  category: DocCategory;
  framework: FrameworkId;
}

const PRE_HEADLINE_STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "at",
  "build",
  "by",
  "css",
  "for",
  "from",
  "in",
  "is",
  "of",
  "on",
  "or",
  "salty",
  "the",
  "time",
  "to",
  "with",
]);

const preHeadlineTokens = (str: string): Set<string> => {
  const out = new Set<string>();
  for (const raw of str.toLowerCase().split(/[^a-z0-9]+/)) {
    if (!raw) continue;
    if (PRE_HEADLINE_STOPWORDS.has(raw)) continue;
    out.add(raw);
  }
  return out;
};

export const assertPreHeadlineDivergent = (
  preHeadline: string,
  metaTitle: string,
  fileLabel: string,
): void => {
  const pre = preHeadlineTokens(preHeadline);
  const meta = preHeadlineTokens(metaTitle);
  const unique: string[] = [];
  for (const token of pre) {
    if (!meta.has(token)) unique.push(token);
  }
  if (unique.length < 2) {
    throw new Error(
      `${fileLabel}: preHeadline must differ from the meta title by ≥2 substantive words. ` +
        `Meta title: "${metaTitle}". preHeadline: "${preHeadline}". ` +
        `Unique tokens in preHeadline: [${unique.join(", ")}]`,
    );
  }
};

export const buildDocTitle = ({
  topic,
  category,
  framework,
}: TemplateArgs): string => {
  const label = frameworkLabel(framework);
  switch (category) {
    case "overview":
      return `Salty CSS Docs — CSS-in-TS for ${label}`;
    case "faq":
      return `Salty CSS FAQ — Answers for ${label} Developers`;
    case "api-reference":
      return `${topic} API Reference — Salty CSS for ${label}`;
    case "tutorial":
      return `${topic} – Set up Salty CSS in ${label}`;
    case "utility":
      return `${topic} – Salty CSS Utility for ${label}`;
    case "concept":
    case "guide":
    default:
      switch (framework) {
        case "react":
          return `${topic} in Salty CSS for React — Build-time CSS-in-TS`;
        case "next":
          return `${topic} in Salty CSS for Next.js — App Router & Static Export`;
        case "astro":
          return `${topic} in Salty CSS for Astro — Zero-runtime Styling`;
      }
  }
};

const FRAMEWORK_TAILS: Record<FrameworkId, string> = {
  react:
    "Authored in .css.ts files with the @salty-css/react styled API and compiled at build time — no runtime.",
  next: 'Drop-in for the Next.js App Router with React Server Component support and full static-export compatibility (output: "export").',
  astro:
    "Compiled to plain CSS for Astro components at build time via the @salty-css/astro integration.",
};

const API_FRAMEWORK_TAILS: Record<FrameworkId, string> = {
  react:
    "Reference for the @salty-css/react package — TypeScript-first, build-time CSS-in-TS for React.",
  next: "Reference for @salty-css/next together with @salty-css/react — RSC-safe and compatible with Next.js static export.",
  astro:
    "Reference for the @salty-css/astro package — zero-runtime styling for Astro components.",
};

const TUTORIAL_FRAMEWORK_TAILS: Record<FrameworkId, string> = {
  react:
    "Step-by-step setup for a React app using Vite or Webpack with the @salty-css/react styled API.",
  next: "Step-by-step setup for a Next.js App Router app — RSC-ready, static-export friendly, no runtime CSS-in-JS.",
  astro:
    "Step-by-step setup for an Astro project using the @salty-css/astro integration and Vite.",
};

const FAQ_FRAMEWORK_TAILS: Record<FrameworkId, string> = {
  react:
    "Answers for React developers adopting Salty CSS — focused on the @salty-css/react styled and className APIs.",
  next: "Answers for Next.js developers adopting Salty CSS — covering the App Router, RSC, and static export caveats.",
  astro:
    "Answers for Astro developers adopting Salty CSS — covering the @salty-css/astro integration and component styling.",
};

const OVERVIEW_FRAMEWORK_TAILS: Record<FrameworkId, string> = {
  react:
    "A complete reference for using Salty CSS in React — styled, className, variants, templates, and CLI tooling.",
  next: "A complete reference for using Salty CSS in Next.js — including App Router, RSC, and static export workflows.",
  astro:
    "A complete reference for using Salty CSS in Astro — components, tokens, templates, and the @salty-css/astro plugin.",
};

interface DescriptionArgs extends TemplateArgs {
  intent: string;
}

export const buildDocDescription = ({
  intent,
  topic,
  category,
  framework,
}: DescriptionArgs): string => {
  const seed = intent.trim();
  const seedWithPeriod = seed
    ? seed.endsWith(".")
      ? seed
      : `${seed}.`
    : "";
  const tail = (() => {
    switch (category) {
      case "api-reference":
        return API_FRAMEWORK_TAILS[framework];
      case "tutorial":
        return TUTORIAL_FRAMEWORK_TAILS[framework];
      case "faq":
        return FAQ_FRAMEWORK_TAILS[framework];
      case "overview":
        return OVERVIEW_FRAMEWORK_TAILS[framework];
      default:
        return FRAMEWORK_TAILS[framework];
    }
  })();
  const lead =
    seedWithPeriod ||
    `${topic} in Salty CSS for ${frameworkLabel(framework)}.`;
  return `${lead} ${tail}`;
};

export const buildDocKeywords = ({
  keywords,
  topic,
  framework,
}: {
  keywords: string[] | undefined;
  topic: string;
  framework: FrameworkId;
}): string[] => {
  const tail = [
    "Salty CSS",
    frameworkLabel(framework),
    "CSS-in-TS",
    "build-time CSS",
    "TypeScript",
  ];
  const merged = [topic, ...(keywords ?? []), ...tail];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const k of merged) {
    const norm = k.trim();
    if (!norm) continue;
    const key = norm.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(norm);
  }
  return out;
};

export interface AlternateLink {
  framework: FrameworkId;
  label: string;
  href: string;
  title: string;
}

export const buildAlternateLinks = ({
  slug,
  topic,
  currentFramework,
  availableFrameworks,
}: {
  slug: string;
  topic: string;
  currentFramework: FrameworkId;
  availableFrameworks: readonly FrameworkId[];
}): AlternateLink[] =>
  availableFrameworks
    .filter((fw) => fw !== currentFramework)
    .map((fw) => {
      const label = frameworkLabel(fw);
      return {
        framework: fw,
        label,
        href: canonicalUrlFor(fw, slug),
        title: `${topic} in Salty CSS for ${label}`,
      };
    });

// ---------- JSON-LD builders ----------

interface JsonLdArgs {
  data: DocFrontmatter;
  slug: string;
  framework: FrameworkId;
  body: string;
}

const baseTechArticle = ({
  data,
  slug,
  framework,
}: Omit<JsonLdArgs, "body">): Record<string, unknown> => {
  const topic = resolveTopic(data);
  const category = resolveCategory(data);
  const label = frameworkLabel(framework);
  const headline = buildDocTitle({ topic, category, framework });
  const description = buildDocDescription({
    intent: resolveIntent(data),
    topic,
    category,
    framework,
  });
  const url = canonicalUrlFor(framework, slug);
  const keywords = buildDocKeywords({
    keywords: data.keywords,
    topic,
    framework,
  });
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline,
    description,
    keywords: keywords.join(", "),
    inLanguage: "en",
    url,
    image: DEFAULT_OG_IMAGE,
    articleSection: "Documentation",
    proficiencyLevel: resolveProficiency(data),
    dependencies: `Salty CSS, ${label}`,
    about: [
      {
        "@type": "SoftwareApplication",
        name: "Salty CSS",
        applicationCategory: "DeveloperApplication",
        url: SITE_ORIGIN,
      },
      {
        "@type": "SoftwareApplication",
        name: label,
      },
    ],
    audience: {
      "@type": "Audience",
      audienceType: `${label} developers`,
    },
    isPartOf: {
      "@type": "TechArticle",
      name: "Salty CSS Documentation",
      url: `${SITE_ORIGIN}/docs/${framework}/`,
    },
    author: { "@type": "Organization", name: "Salty CSS", url: SITE_ORIGIN },
    publisher: {
      "@type": "Organization",
      name: "Salty CSS",
      url: SITE_ORIGIN,
    },
  };
};

const buildApiReference = (
  args: Omit<JsonLdArgs, "body">,
): Record<string, unknown> => {
  const article = baseTechArticle(args);
  const topic = resolveTopic(args.data);
  const fw = frameworkData(args.framework);
  // Pick an import line that matches the page's API surface.
  const lower = topic.toLowerCase();
  const importPath = lower.includes("class")
    ? fw.classNameImport
    : lower.includes("keyframe") || lower.includes("animation")
      ? fw.keyframesImport
      : fw.styledImport;
  const importedName = lower.includes("class")
    ? "className"
    : lower.includes("keyframe") || lower.includes("animation")
      ? "keyframes"
      : "styled";
  return {
    ...article,
    articleSection: "API Reference",
    mainEntity: {
      "@type": "SoftwareSourceCode",
      name: topic,
      programmingLanguage: "TypeScript",
      codeRepository: REPO_URL,
      codeSampleType: "ImportStatement",
      runtimePlatform: frameworkLabel(args.framework),
      text: `import { ${importedName} } from "${importPath}";`,
    },
  };
};

const buildTutorial = (
  args: Omit<JsonLdArgs, "body">,
): Record<string, unknown> => ({
  ...baseTechArticle(args),
  articleSection: "Tutorial",
});

// ---- FAQ parsing ----

const stripMarkdownForAnswer = (raw: string): string => {
  let s = raw;
  // Remove fenced code blocks but keep contents.
  s = s.replace(/```[a-zA-Z0-9_-]*\n([\s\S]*?)```/g, "$1");
  // Inline code backticks.
  s = s.replace(/`([^`]+)`/g, "$1");
  // Bold/italic.
  s = s.replace(/\*\*([^*]+)\*\*/g, "$1");
  s = s.replace(/\*([^*]+)\*/g, "$1");
  // Links: [text](url) -> text (url)
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)");
  // Bullet markers at line starts.
  s = s.replace(/^\s*[-*]\s+/gm, "");
  // Trim leading/trailing whitespace and collapse blank lines.
  return s.replace(/\n{3,}/g, "\n\n").trim();
};

interface FaqEntry {
  question: string;
  answer: string;
}

export const extractFaq = (body: string): FaqEntry[] => {
  const lines = body.split(/\r?\n/);
  const entries: FaqEntry[] = [];
  let current: FaqEntry | null = null;
  let buf: string[] = [];
  const flush = () => {
    if (current) {
      current.answer = stripMarkdownForAnswer(buf.join("\n"));
      if (current.question && current.answer) entries.push(current);
    }
    current = null;
    buf = [];
  };
  for (const line of lines) {
    const h3 = line.match(/^###\s+(.+?)\s*$/);
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    if (h3) {
      flush();
      current = { question: h3[1].trim(), answer: "" };
      continue;
    }
    if (h2) {
      flush();
      continue;
    }
    if (current) buf.push(line);
  }
  flush();
  return entries;
};

const buildFaqPage = (args: JsonLdArgs): Record<string, unknown> => {
  const { data, slug, framework, body } = args;
  const topic = resolveTopic(data);
  const category = resolveCategory(data);
  const label = frameworkLabel(framework);
  const url = canonicalUrlFor(framework, slug);
  const description = buildDocDescription({
    intent: resolveIntent(data),
    topic,
    category,
    framework,
  });
  const entries = extractFaq(body);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: buildDocTitle({ topic, category, framework }),
    description,
    inLanguage: "en",
    url,
    about: [
      {
        "@type": "SoftwareApplication",
        name: "Salty CSS",
        applicationCategory: "DeveloperApplication",
        url: SITE_ORIGIN,
      },
      { "@type": "SoftwareApplication", name: label },
    ],
    audience: {
      "@type": "Audience",
      audienceType: `${label} developers`,
    },
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: e.question,
      acceptedAnswer: { "@type": "Answer", text: e.answer },
    })),
  };
};

export const buildDocJsonLd = (
  args: JsonLdArgs,
): Record<string, unknown> => {
  const schemaType = resolveSchemaType(args.data);
  switch (schemaType) {
    case "APIReference":
      return buildApiReference(args);
    case "FAQPage":
      return buildFaqPage(args);
    case "HowTo":
      return buildTutorial(args);
    case "TechArticle":
    default:
      if (resolveCategory(args.data) === "tutorial") return buildTutorial(args);
      return baseTechArticle(args);
  }
};

export const buildBreadcrumbJsonLd = ({
  framework,
  slug,
  topic,
}: {
  framework: FrameworkId;
  slug: string;
  topic: string;
}): Record<string, unknown> => {
  const label = frameworkLabel(framework);
  const docsUrl = `${SITE_ORIGIN}/docs/${framework}/`;
  const items: Array<{ name: string; item: string }> = [
    { name: "Home", item: `${SITE_ORIGIN}/` },
    { name: `Docs ${label}`, item: docsUrl },
  ];
  if (slug) {
    items.push({ name: topic, item: canonicalUrlFor(framework, slug) });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.item,
    })),
  };
};

export const buildSiteJsonLd = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Salty CSS",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web, Node.js",
  url: SITE_ORIGIN,
  description:
    "Build-time CSS-in-JS library for React, Next.js, and Astro — zero runtime, TypeScript-first.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  sameAs: [REPO_URL, NPM_URL, DISCORD_URL],
});

export { FRAMEWORK_IDS };
