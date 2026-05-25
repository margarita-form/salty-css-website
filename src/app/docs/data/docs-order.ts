import { DOC_GROUPS } from "./docs-groups";

// Ordered list of doc slugs. Empty string represents the docs index page.
// Titles, descriptions, and per-framework availability live in each MD
// file's frontmatter; this file only owns ordering.
export const DOC_ORDER = [
  "",
  "quick-start",
  "installation",
  "usage",
  "troubleshooting",
  "faq",
  "cli",
  "eslint",
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
] as const;

export type DocSlug = (typeof DOC_ORDER)[number];

export const LAST_DOC_SLUG: string = DOC_ORDER[DOC_ORDER.length - 1];

export const getPreviousSlug = (slug: string): string | null => {
  const idx = (DOC_ORDER as readonly string[]).indexOf(slug);
  if (idx <= 0) return null;
  return DOC_ORDER[idx - 1];
};

export const getNextSlug = (slug: string): string | null => {
  const idx = (DOC_ORDER as readonly string[]).indexOf(slug);
  if (idx < 0 || idx >= DOC_ORDER.length - 1) return null;
  return DOC_ORDER[idx + 1];
};

// Slugs of the category landing pages (Getting Started, Styling, Utilities,
// API). Kept separate from DOC_ORDER so they're statically exported and
// indexed but stay out of the linear prev/next walk used by PageTrail.
export const CATEGORY_INDEX_SLUGS = DOC_GROUPS.map(
  (g) => g.id,
) as readonly string[];

export const isCategoryIndexSlug = (slug: string): boolean =>
  (CATEGORY_INDEX_SLUGS as readonly string[]).includes(slug);

// Default sitemap priorities, derived from the previous hand-maintained
// public/sitemap.xml. Frontmatter `priority:` overrides this per-page.
export const DEFAULT_PRIORITIES: Record<string, number> = {
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
  eslint: 0.7,
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
  "getting-started": 0.7,
  styling: 0.7,
  utilities: 0.7,
  api: 0.7,
};
