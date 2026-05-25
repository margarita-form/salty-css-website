export interface FrameworkData {
  installCli: string;
  bundler: string;
  ssrNote: string;
  packageRoot: string;
  styledImport: string;
  classNameImport: string;
  keyframesImport: string;
  configImport: string;
  helpersImport: string;
  runtimeImport: string;
  // Framework-aware prose tokens used in docs markdown.
  componentNoun: string;
  frameworkRuntime: string;
  usageContext: string;
  jsxClassAttr: string;
}

const reactSubpaths = {
  packageRoot: "@salty-css/react",
  styledImport: "@salty-css/react/styled",
  classNameImport: "@salty-css/react/class-name",
  keyframesImport: "@salty-css/react/keyframes",
  configImport: "@salty-css/react/config",
  helpersImport: "@salty-css/react/helpers",
  runtimeImport: "@salty-css/react/runtime",
} as const;

const astroSubpaths = {
  packageRoot: "@salty-css/astro",
  styledImport: "@salty-css/astro/styled",
  classNameImport: "@salty-css/astro/class-name",
  keyframesImport: "@salty-css/astro/keyframes",
  configImport: "@salty-css/astro/config",
  helpersImport: "@salty-css/astro/helpers",
  runtimeImport: "@salty-css/astro/runtime",
} as const;

export type FrameworkFamily = "react" | "astro";

export const FRAMEWORKS = [
  {
    id: "react",
    label: "React",
    icon: "/icons/frameworks/react.svg",
    family: "react",
    data: {
      installCli: "npm i @salty-css/react",
      bundler: "Vite or Webpack",
      ssrNote: "",
      ...reactSubpaths,
      componentNoun: "React component",
      frameworkRuntime: "React",
      usageContext: "anywhere in your app",
      jsxClassAttr: "JSX `className` attribute",
    },
  },
  {
    id: "next",
    label: "Next.js",
    icon: "/icons/frameworks/next.svg",
    family: "react",
    data: {
      installCli: "npm i @salty-css/next @salty-css/react",
      bundler: "Webpack or Turbopack",
      ssrNote: "Next App Router supports RSC out of the box.",
      ...reactSubpaths,
      componentNoun: "React component",
      frameworkRuntime: "React",
      usageContext: "anywhere in your app",
      jsxClassAttr: "JSX `className` attribute",
    },
  },
  {
    id: "astro",
    label: "Astro",
    icon: "/icons/frameworks/astro.svg",
    family: "astro",
    data: {
      installCli: "npm i @salty-css/astro",
      bundler: "Vite",
      ssrNote: "",
      ...astroSubpaths,
      componentNoun: "Astro component",
      frameworkRuntime: "Astro",
      usageContext: "in your `.astro` pages",
      jsxClassAttr: "Astro `class` attribute",
    },
  },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  icon: string;
  family: FrameworkFamily;
  data: FrameworkData;
}>;

export type FrameworkId = (typeof FRAMEWORKS)[number]["id"];
export type Framework = (typeof FRAMEWORKS)[number];

export const getFramework = (id: FrameworkId): Framework =>
  FRAMEWORKS.find((f) => f.id === id) ?? FRAMEWORKS[0];

export const FRAMEWORK_IDS = FRAMEWORKS.map((f) => f.id) as FrameworkId[];

export const DEFAULT_FRAMEWORK: FrameworkId = "react";

export const isFrameworkId = (value: unknown): value is FrameworkId =>
  typeof value === "string" &&
  (FRAMEWORK_IDS as readonly string[]).includes(value);

export const frameworkLabel = (id: FrameworkId) =>
  FRAMEWORKS.find((f) => f.id === id)?.label ?? id;

export const frameworkFamily = (id: FrameworkId): FrameworkFamily =>
  getFramework(id).family;

export const frameworkData = (
  id: FrameworkId,
): FrameworkData & {
  frameworkId: FrameworkId;
  frameworkLabel: string;
  frameworkFamily: FrameworkFamily;
} => ({
  ...getFramework(id).data,
  frameworkId: id,
  frameworkLabel: frameworkLabel(id),
  frameworkFamily: frameworkFamily(id),
});
