// Grouping of doc slugs by sidebar section. Used by the breadcrumb component
// and BreadcrumbList JSON-LD to surface "what section is this page under".
// Order/labels mirror src/app/docs/components/docs-nav.tsx.
export const DOC_GROUPS = [
  {
    id: "getting-started",
    label: "Getting Started",
    slugs: ["quick-start", "installation", "usage", "cli", "faq"],
  },
  {
    id: "styling",
    label: "Styling",
    slugs: [
      "basics",
      "classnames",
      "variants",
      "overrides",
      "media-queries",
      "animations",
      "templates",
    ],
  },
  {
    id: "utilities",
    label: "Utilities",
    slugs: ["viewport-clamp", "color-function"],
  },
  {
    id: "api",
    label: "API",
    slugs: ["api/styled", "api/classname"],
  },
] as const;

export type DocGroup = (typeof DOC_GROUPS)[number];

export const findDocGroup = (slug: string): DocGroup | undefined =>
  DOC_GROUPS.find((g) => (g.slugs as readonly string[]).includes(slug));
