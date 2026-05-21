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
] as const;

export type DocSlug = (typeof DOC_ORDER)[number];

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
