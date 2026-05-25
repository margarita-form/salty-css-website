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

export type PerFrameworkText = string | Partial<Record<FrameworkId, string>>;
export type PerFrameworkList =
  | string[]
  | Partial<Record<FrameworkId, string[]>>;
export type PerFrameworkLinkMap =
  | Record<string, string>
  | Partial<Record<FrameworkId, Record<string, string>>>;

export const NEXT_PAGE_END = "end";
export const PREVIOUS_PAGE_NONE = "none";

export interface DocFrontmatter {
  title: string;
  description: string;
  preHeadline: PerFrameworkText;
  visibleHeading: PerFrameworkText;
  frameworks?: FrameworkId[];
  priority?: number;
  topic?: string;
  category?: DocCategory;
  schemaType?: SchemaType;
  keywords?: string[];
  intent?: string;
  proficiencyLevel?: ProficiencyLevel;
  nextPage?: PerFrameworkText | typeof NEXT_PAGE_END;
  previousPage?: PerFrameworkText | typeof PREVIOUS_PAGE_NONE;
  apiReferences?: PerFrameworkList;
  externalLinks?: PerFrameworkLinkMap;
}

export interface ParsedDoc {
  data: DocFrontmatter;
  body: string;
}

const ALLOWED_KEYS = new Set<keyof DocFrontmatter>([
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
  "nextPage",
  "previousPage",
  "apiReferences",
  "externalLinks",
]);

const PER_FRAMEWORK_KEYS = new Set<keyof DocFrontmatter>([
  "preHeadline",
  "visibleHeading",
  "nextPage",
  "previousPage",
]);

const VISIBLE_HEADING_MAX_LENGTH = 100;

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

const BLOCK_SCALAR_INDICATORS = new Set([">", ">-", ">+", "|", "|-", "|+"]);

const readBlockScalar = (
  indicator: string,
  lines: string[],
  startIdx: number,
): { value: string; nextIdx: number } => {
  const collected: string[] = [];
  let i = startIdx;
  let baseIndent: number | null = null;
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
  let value: string;
  if (folded) {
    value = collected
      .reduce<string[]>((acc, line) => {
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
  if (indicator.endsWith("+")) value += "\n";
  else if (!indicator.endsWith("-")) value += "\n"; // clip mode
  return { value: value.replace(/\n+$/, ""), nextIdx: i };
};

const nextNonBlankIsIndented = (lines: string[], startIdx: number): boolean => {
  for (let j = startIdx; j < lines.length; j++) {
    if (lines[j].trim() === "") continue;
    return /^\s/.test(lines[j]);
  }
  return false;
};

const readNestedMap = (
  lines: string[],
  startIdx: number,
): { value: Record<string, string>; nextIdx: number } => {
  const result: Record<string, string> = {};
  let i = startIdx;
  let baseIndent: number | null = null;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") {
      i += 1;
      continue;
    }
    const indentMatch = line.match(/^(\s+)/);
    if (!indentMatch) break;
    const indent = indentMatch[1].length;
    if (baseIndent === null) baseIndent = indent;
    if (indent < baseIndent) break;
    if (indent > baseIndent) {
      throw new Error(
        `Unexpected indentation in nested map at line ${i + 1}: ${line}`,
      );
    }
    const trimmed = line.slice(baseIndent);
    const colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1) {
      throw new Error(
        `Nested map entry missing colon at line ${i + 1}: ${line}`,
      );
    }
    const subkey = trimmed.slice(0, colonIdx).trim();
    let subValue = trimmed.slice(colonIdx + 1).trim();
    i += 1;
    if (BLOCK_SCALAR_INDICATORS.has(subValue)) {
      const { value, nextIdx } = readBlockScalar(subValue, lines, i);
      subValue = value;
      i = nextIdx;
    }
    result[subkey] = stripQuotes(subValue);
  }
  return { value: result, nextIdx: i };
};

const firstInnerKeyIsPerFramework = (
  lines: string[],
  startIdx: number,
): boolean => {
  for (let j = startIdx; j < lines.length; j++) {
    const line = lines[j];
    if (line.trim() === "") continue;
    if (!/^\s/.test(line)) return false;
    const trimmed = line.trim();
    const colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1) return false;
    const key = trimmed.slice(0, colonIdx).trim();
    return isFrameworkId(key);
  }
  return false;
};

const parseInlineArrayValue = (rawValue: string): string[] | null => {
  const trimmed = rawValue.trim();
  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) return null;
  return parseInlineArray(trimmed).filter(Boolean);
};

const readNestedMapOfArrays = (
  lines: string[],
  startIdx: number,
  fieldName: string,
): { value: Partial<Record<FrameworkId, string[]>>; nextIdx: number } => {
  const { value: rawMap, nextIdx } = readNestedMap(lines, startIdx);
  const result: Partial<Record<FrameworkId, string[]>> = {};
  for (const [k, v] of Object.entries(rawMap)) {
    if (!isFrameworkId(k)) {
      throw new Error(
        `Unknown framework in ${fieldName} map: ${k} (expected one of ${FRAMEWORK_IDS.join(", ")})`,
      );
    }
    const arr = parseInlineArrayValue(v);
    if (!arr) {
      throw new Error(
        `${fieldName}.${k} must be an inline array like [slug-a, slug-b]; got: ${v}`,
      );
    }
    result[k] = arr;
  }
  return { value: result, nextIdx };
};

const readNestedNestedMap = (
  lines: string[],
  startIdx: number,
  fieldName: string,
): {
  value: Partial<Record<FrameworkId, Record<string, string>>>;
  nextIdx: number;
} => {
  const result: Partial<Record<FrameworkId, Record<string, string>>> = {};
  let i = startIdx;
  let baseIndent: number | null = null;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") {
      i += 1;
      continue;
    }
    const indentMatch = line.match(/^(\s+)/);
    if (!indentMatch) break;
    const indent = indentMatch[1].length;
    if (baseIndent === null) baseIndent = indent;
    if (indent < baseIndent) break;
    if (indent > baseIndent) {
      throw new Error(
        `Unexpected indentation in ${fieldName} at line ${i + 1}: ${line}`,
      );
    }
    const trimmed = line.slice(baseIndent);
    const colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1) {
      throw new Error(
        `${fieldName} entry missing colon at line ${i + 1}: ${line}`,
      );
    }
    const subkey = trimmed.slice(0, colonIdx).trim();
    const subValue = trimmed.slice(colonIdx + 1).trim();
    if (!isFrameworkId(subkey)) {
      throw new Error(
        `Unknown framework in ${fieldName} map: ${subkey} (expected one of ${FRAMEWORK_IDS.join(", ")})`,
      );
    }
    if (subValue !== "") {
      throw new Error(
        `${fieldName}.${subkey} must be a nested map of "Label: URL" entries, not an inline value`,
      );
    }
    i += 1;
    const { value: innerMap, nextIdx } = readNestedMap(lines, i);
    if (Object.keys(innerMap).length === 0) {
      throw new Error(
        `${fieldName}.${subkey} is empty; add at least one "Label: URL" entry`,
      );
    }
    result[subkey] = innerMap;
    i = nextIdx;
  }
  return { value: result, nextIdx: i };
};

const parsePerFrameworkValue = (
  fieldName: string,
  rawValue: string,
  lines: string[],
  startIdx: number,
): { value: PerFrameworkText; nextIdx: number } => {
  if (rawValue === "" && nextNonBlankIsIndented(lines, startIdx)) {
    const { value: map, nextIdx } = readNestedMap(lines, startIdx);
    for (const fwKey of Object.keys(map)) {
      if (!isFrameworkId(fwKey)) {
        throw new Error(
          `Unknown framework in ${fieldName} map: ${fwKey} (expected one of ${FRAMEWORK_IDS.join(", ")})`,
        );
      }
    }
    return {
      value: map as Partial<Record<FrameworkId, string>>,
      nextIdx,
    };
  }
  return { value: stripQuotes(rawValue), nextIdx: startIdx };
};

const assertPerFrameworkPresent = (
  value: PerFrameworkText | undefined,
  fieldName: string,
  fileLabel: string,
): void => {
  if (value === undefined) {
    throw new Error(
      `${fileLabel}: missing required frontmatter key "${fieldName}"`,
    );
  }
  if (typeof value === "string" && !value.trim()) {
    throw new Error(
      `${fileLabel}: ${fieldName} is empty; provide a hand-crafted string or a per-framework map (${FRAMEWORK_IDS.join(" / ")})`,
    );
  }
  if (
    typeof value === "object" &&
    Object.keys(value).length === 0
  ) {
    throw new Error(
      `${fileLabel}: ${fieldName} map is empty; provide at least one of ${FRAMEWORK_IDS.join(" / ")}`,
    );
  }
};

const emittedWarnings = new Set<string>();
const warnOnce = (key: string, message: string): void => {
  if (emittedWarnings.has(key)) return;
  emittedWarnings.add(key);
  console.warn(message);
};

const warnVisibleHeadingUniqueness = (
  value: PerFrameworkText,
  fileLabel: string,
): void => {
  if (typeof value === "string") return;
  const seen = new Map<string, FrameworkId>();
  for (const fw of FRAMEWORK_IDS) {
    const v = value[fw];
    if (!v) continue;
    const norm = v.trim().toLowerCase();
    const prior = seen.get(norm);
    if (prior) {
      warnOnce(
        `unique:${fileLabel}:${prior}:${fw}`,
        `[doc-warn] ${fileLabel}: visibleHeading is identical for "${prior}" and "${fw}" (${v}). Each framework's H1 should be distinct.`,
      );
    } else {
      seen.set(norm, fw);
    }
  }
};

const warnVisibleHeadingLength = (
  value: PerFrameworkText,
  fileLabel: string,
): void => {
  const check = (v: string, fw?: FrameworkId) => {
    if (v.length > VISIBLE_HEADING_MAX_LENGTH) {
      const where = fw ? `.${fw}` : "";
      warnOnce(
        `length:${fileLabel}:${fw ?? ""}`,
        `[doc-warn] ${fileLabel}: visibleHeading${where} is ${v.length} chars (cap ${VISIBLE_HEADING_MAX_LENGTH}). Consider shortening: "${v}"`,
      );
    }
  };
  if (typeof value === "string") {
    check(value);
    return;
  }
  for (const fw of FRAMEWORK_IDS) {
    const v = value[fw];
    if (v) check(v, fw);
  }
};

export const parseFrontmatter = (
  raw: string,
  fileLabel = "<doc>",
): ParsedDoc => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    return {
      data: {
        title: "",
        description: "",
        preHeadline: "",
        visibleHeading: "",
      },
      body: raw,
    };
  }

  const block = match[1];
  const body = raw.slice(match[0].length);
  const data: Partial<DocFrontmatter> = {};

  const lines = block.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim() as keyof DocFrontmatter;
    if (!ALLOWED_KEYS.has(key)) {
      throw new Error(`Unknown frontmatter key: ${key}`);
    }
    let rawValue = line.slice(colonIdx + 1).trim();

    if (BLOCK_SCALAR_INDICATORS.has(rawValue)) {
      const { value, nextIdx } = readBlockScalar(rawValue, lines, i + 1);
      rawValue = value;
      i = nextIdx - 1;
    }

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
      if (!isDocCategory(v)) throw new Error(`Unknown doc category: ${v}`);
      data.category = v;
    } else if (key === "schemaType") {
      const v = stripQuotes(rawValue);
      if (!isSchemaType(v)) throw new Error(`Unknown schemaType: ${v}`);
      data.schemaType = v;
    } else if (key === "proficiencyLevel") {
      const v = stripQuotes(rawValue);
      if (!isProficiencyLevel(v))
        throw new Error(`Unknown proficiencyLevel: ${v}`);
      data.proficiencyLevel = v;
    } else if (key === "apiReferences") {
      const inline = parseInlineArrayValue(rawValue);
      if (inline) {
        data.apiReferences = inline;
      } else if (rawValue === "" && nextNonBlankIsIndented(lines, i + 1)) {
        const { value, nextIdx } = readNestedMapOfArrays(
          lines,
          i + 1,
          "apiReferences",
        );
        data.apiReferences = value;
        if (nextIdx > i + 1) i = nextIdx - 1;
      } else {
        throw new Error(
          `apiReferences must be an inline array [slug-a, slug-b] or a per-framework map; got: ${rawValue}`,
        );
      }
    } else if (key === "externalLinks") {
      if (rawValue !== "" || !nextNonBlankIsIndented(lines, i + 1)) {
        throw new Error(
          `externalLinks must be a nested map; either "Label: URL" entries or per-framework groups`,
        );
      }
      if (firstInnerKeyIsPerFramework(lines, i + 1)) {
        const { value, nextIdx } = readNestedNestedMap(
          lines,
          i + 1,
          "externalLinks",
        );
        data.externalLinks = value;
        if (nextIdx > i + 1) i = nextIdx - 1;
      } else {
        const { value, nextIdx } = readNestedMap(lines, i + 1);
        data.externalLinks = value;
        if (nextIdx > i + 1) i = nextIdx - 1;
      }
    } else if (PER_FRAMEWORK_KEYS.has(key)) {
      const { value, nextIdx } = parsePerFrameworkValue(
        key,
        rawValue,
        lines,
        i + 1,
      );
      data[key] = value as never;
      if (nextIdx > i + 1) i = nextIdx - 1;
    } else {
      data[key] = stripQuotes(rawValue) as never;
    }
  }

  assertPerFrameworkPresent(data.preHeadline, "preHeadline", fileLabel);
  assertPerFrameworkPresent(data.visibleHeading, "visibleHeading", fileLabel);
  warnVisibleHeadingUniqueness(data.visibleHeading!, fileLabel);
  warnVisibleHeadingLength(data.visibleHeading!, fileLabel);

  return {
    data: {
      title: data.title ?? "",
      description: data.description ?? "",
      preHeadline: data.preHeadline!,
      visibleHeading: data.visibleHeading!,
      frameworks: data.frameworks,
      priority: data.priority,
      topic: data.topic,
      category: data.category,
      schemaType: data.schemaType,
      keywords: data.keywords,
      intent: data.intent,
      proficiencyLevel: data.proficiencyLevel,
      nextPage: data.nextPage,
      previousPage: data.previousPage,
      apiReferences: data.apiReferences,
      externalLinks: data.externalLinks,
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
