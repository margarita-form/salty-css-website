import {
  loadDocSource,
  parseFrontmatter,
  sourceFilenameFor,
  type DocFrontmatter,
  type PerFrameworkText,
} from "@/lib/docs-content";
import { canonicalPathFor } from "@/lib/docs-seo";
import { type FrameworkId } from "@/lib/frameworks";

export interface DocSummary {
  slug: string;
  href: string;
  label: string;
  description: string;
}

const resolveLabel = (
  value: PerFrameworkText,
  framework: FrameworkId,
): string | null => {
  if (typeof value === "string") return value.trim() || null;
  const v = value[framework];
  if (v && v.trim()) return v.trim();
  for (const k of Object.keys(value)) {
    const v2 = value[k as FrameworkId];
    if (v2 && v2.trim()) return v2.trim();
  }
  return null;
};

const cache = new Map<string, Promise<DocSummary | null>>();

const buildSummary = async (
  slug: string,
  framework: FrameworkId,
): Promise<DocSummary | null> => {
  try {
    const raw = await loadDocSource(slug, framework);
    const { data } = parseFrontmatter(raw, sourceFilenameFor(slug, framework));
    return summaryFromFrontmatter(slug, framework, data);
  } catch {
    return null;
  }
};

export const summaryFromFrontmatter = (
  slug: string,
  framework: FrameworkId,
  data: DocFrontmatter,
): DocSummary => {
  const label =
    resolveLabel(data.visibleHeading, framework) ||
    data.topic ||
    data.title ||
    slug;
  return {
    slug,
    href: canonicalPathFor(framework, slug),
    label,
    description: data.description ?? "",
  };
};

export const getDocSummary = (
  slug: string,
  framework: FrameworkId,
): Promise<DocSummary | null> => {
  const key = `${framework}|${slug}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const promise = buildSummary(slug, framework);
  cache.set(key, promise);
  return promise;
};
