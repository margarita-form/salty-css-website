import { FRAMEWORK_IDS, isFrameworkId, type FrameworkId } from "./frameworks";

export const DOC_CATEGORIES = [
  "guide",
  "tutorial",
  "api-reference",
  "concept",
  "faq",
  "overview",
  "utility",
] as const;
export type DocCategory = (typeof DOC_CATEGORIES)[number];

export const SCHEMA_TYPES = [
  "TechArticle",
  "APIReference",
  "HowTo",
  "FAQPage",
] as const;
export type SchemaType = (typeof SCHEMA_TYPES)[number];

export const PROFICIENCY_LEVELS = [
  "Beginner",
  "Intermediate",
  "Expert",
] as const;
export type ProficiencyLevel = (typeof PROFICIENCY_LEVELS)[number];

export interface DocFrontmatter {
  title: string;
  description: string;
  frameworks?: FrameworkId[];
  priority?: number;
  topic?: string;
  category?: DocCategory;
  schemaType?: SchemaType;
  keywords?: string[];
  intent?: string;
  proficiencyLevel?: ProficiencyLevel;
}

export interface ParsedDoc {
  data: DocFrontmatter;
  body: string;
}

const ALLOWED_KEYS = new Set<keyof DocFrontmatter>([
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

const stripQuotes = (value: string): string => {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
};

const parseInlineArray = (value: string): string[] => {
  const inner = value.trim().replace(/^\[/, "").replace(/\]$/, "");
  if (!inner.trim()) return [];
  return inner.split(",").map((item) => stripQuotes(item));
};

const isDocCategory = (v: string): v is DocCategory =>
  (DOC_CATEGORIES as readonly string[]).includes(v);
const isSchemaType = (v: string): v is SchemaType =>
  (SCHEMA_TYPES as readonly string[]).includes(v);
const isProficiencyLevel = (v: string): v is ProficiencyLevel =>
  (PROFICIENCY_LEVELS as readonly string[]).includes(v);

export const parseFrontmatter = (raw: string): ParsedDoc => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    return {
      data: { title: "", description: "" },
      body: raw,
    };
  }

  const block = match[1];
  const body = raw.slice(match[0].length);
  const data: Partial<DocFrontmatter> = {};

  for (const line of block.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim() as keyof DocFrontmatter;
    if (!ALLOWED_KEYS.has(key)) {
      throw new Error(`Unknown frontmatter key: ${key}`);
    }
    const rawValue = line.slice(colonIdx + 1).trim();

    if (key === "frameworks") {
      const ids = parseInlineArray(rawValue).filter(isFrameworkId);
      data.frameworks = ids;
    } else if (key === "keywords") {
      data.keywords = parseInlineArray(rawValue).filter(Boolean);
    } else if (key === "priority") {
      const num = Number(rawValue);
      if (!Number.isNaN(num)) data.priority = num;
    } else if (key === "category") {
      const v = stripQuotes(rawValue);
      if (!isDocCategory(v))
        throw new Error(`Unknown doc category: ${v}`);
      data.category = v;
    } else if (key === "schemaType") {
      const v = stripQuotes(rawValue);
      if (!isSchemaType(v))
        throw new Error(`Unknown schemaType: ${v}`);
      data.schemaType = v;
    } else if (key === "proficiencyLevel") {
      const v = stripQuotes(rawValue);
      if (!isProficiencyLevel(v))
        throw new Error(`Unknown proficiencyLevel: ${v}`);
      data.proficiencyLevel = v;
    } else {
      data[key] = stripQuotes(rawValue) as never;
    }
  }

  return {
    data: {
      title: data.title ?? "",
      description: data.description ?? "",
      frameworks: data.frameworks,
      priority: data.priority,
      topic: data.topic,
      category: data.category,
      schemaType: data.schemaType,
      keywords: data.keywords,
      intent: data.intent,
      proficiencyLevel: data.proficiencyLevel,
    },
    body,
  };
};

export const applicableFrameworks = (data: DocFrontmatter): FrameworkId[] =>
  data.frameworks && data.frameworks.length > 0
    ? data.frameworks
    : [...FRAMEWORK_IDS];

const SLUG_FILE = (slug: string): string =>
  slug === "" ? "index" : slug.replace(/\//g, "-");

export const sourceFilenameFor = (slug: string, framework?: FrameworkId) => {
  const base = SLUG_FILE(slug);
  return framework ? `${base}.${framework}.md` : `${base}.md`;
};

export const loadDocSource = async (
  slug: string,
  framework: FrameworkId,
): Promise<string> => {
  const base = SLUG_FILE(slug);
  try {
    const mod = await import(
      /* webpackMode: "eager" */ `@/content/docs/${base}.${framework}.md`
    );
    return mod.default as string;
  } catch {
    // Override file is optional; fall back to canonical.
  }
  const mod = await import(`@/content/docs/${base}.md`);
  return mod.default as string;
};
