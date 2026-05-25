import {
  NEXT_PAGE_END,
  PREVIOUS_PAGE_NONE,
  type DocFrontmatter,
  type PerFrameworkLinkMap,
  type PerFrameworkList,
  type PerFrameworkText,
} from "@/lib/docs-content";
import { type FrameworkId } from "@/lib/frameworks";
import { getNextSlug, getPreviousSlug } from "../data/docs-order";
import { getDocSummary, type DocSummary } from "../data/doc-titles";
import {
  PageTrailColumn,
  PageTrailColumnTitle,
  PageTrailCtaRow,
  PageTrailExtGlyph,
  PageTrailExternalLink,
  PageTrailEyebrow,
  PageTrailInternalLink,
  PageTrailItem,
  PageTrailLinkGlyph,
  PageTrailList,
  PageTrailNext,
  PageTrailArrow,
  PageTrailNextEyebrow,
  PageTrailNextRow,
  PageTrailNextTitle,
  PageTrailPrev,
  PageTrailPrevEyebrow,
  PageTrailPrevTitle,
  PageTrailSecondaryRow,
  PageTrailSection,
  PageTrailPrevRow,
} from "./page-trail.css";

interface PageTrailProps {
  framework: FrameworkId;
  currentSlug: string;
  data: DocFrontmatter;
  fileLabel: string;
}

const resolvePerFwString = (
  value: PerFrameworkText | undefined,
  framework: FrameworkId,
): string | null => {
  if (value === undefined) return null;
  if (typeof value === "string") return value.trim() || null;
  const v = value[framework];
  return v && v.trim() ? v.trim() : null;
};

const resolvePerFwList = (
  value: PerFrameworkList | undefined,
  framework: FrameworkId,
): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value[framework] ?? [];
};

const isFlatLinkMap = (
  value: Record<string, unknown>,
): value is Record<string, string> =>
  Object.values(value).every((v) => typeof v === "string");

const resolvePerFwLinks = (
  value: PerFrameworkLinkMap | undefined,
  framework: FrameworkId,
): { label: string; href: string }[] => {
  if (!value) return [];
  const flat: Record<string, string> | undefined = isFlatLinkMap(
    value as Record<string, unknown>,
  )
    ? (value as Record<string, string>)
    : (value as Partial<Record<FrameworkId, Record<string, string>>>)[
        framework
      ];
  if (!flat) return [];
  return Object.entries(flat).map(([label, href]) => ({ label, href }));
};

const resolveNextSlug = (
  data: DocFrontmatter,
  currentSlug: string,
  framework: FrameworkId,
  fileLabel: string,
): string | null => {
  if (data.nextPage === NEXT_PAGE_END) return null;
  const override =
    typeof data.nextPage === "string"
      ? data.nextPage
      : resolvePerFwString(data.nextPage, framework);
  if (override) return override;
  const fallback = getNextSlug(currentSlug);
  if (fallback !== null) return fallback;
  throw new Error(
    `${fileLabel}: this is the last doc in DOC_ORDER but no nextPage was declared. ` +
      `Add "nextPage: end" or "nextPage: <slug>" to the frontmatter.`,
  );
};

const resolvePrevSlug = (
  data: DocFrontmatter,
  currentSlug: string,
  framework: FrameworkId,
): string | null => {
  if (data.previousPage === PREVIOUS_PAGE_NONE) return null;
  const override =
    typeof data.previousPage === "string"
      ? data.previousPage
      : resolvePerFwString(data.previousPage, framework);
  if (override) return override;
  return getPreviousSlug(currentSlug);
};

const isExternal = (href: string): boolean =>
  href.startsWith("http://") || href.startsWith("https://");

export const PageTrail = async ({
  framework,
  currentSlug,
  data,
  fileLabel,
}: PageTrailProps) => {
  const nextSlug = resolveNextSlug(data, currentSlug, framework, fileLabel);
  const prevSlug = resolvePrevSlug(data, currentSlug, framework);

  const apiRefSlugs = resolvePerFwList(data.apiReferences, framework);
  const externalLinks = resolvePerFwLinks(data.externalLinks, framework);

  const [next, prev, apiRefs] = await Promise.all([
    nextSlug ? getDocSummary(nextSlug, framework) : Promise.resolve(null),
    prevSlug ? getDocSummary(prevSlug, framework) : Promise.resolve(null),
    Promise.all(apiRefSlugs.map((s) => getDocSummary(s, framework))),
  ]);

  const apiRefSummaries: DocSummary[] = apiRefs.filter(
    (s): s is DocSummary => s !== null,
  );

  const hasSecondary = apiRefSummaries.length > 0 || externalLinks.length > 0;
  if (!next && !prev && !hasSecondary) return null;

  return (
    <PageTrailSection aria-label="Continue reading">
      <PageTrailEyebrow>Keep reading</PageTrailEyebrow>
      {(next || prev) && (
        <PageTrailCtaRow data-has-prev={prev ? "true" : "false"}>
          {prev && (
            <PageTrailPrev href={prev.href}>
              <PageTrailPrevRow>
                <PageTrailArrow
                  css-src="url(/icons/arrow-to-left.svg)"
                  aria-hidden="true"
                />
                <PageTrailPrevEyebrow>Previous</PageTrailPrevEyebrow>
              </PageTrailPrevRow>
              <PageTrailPrevTitle>{prev.label}</PageTrailPrevTitle>
            </PageTrailPrev>
          )}
          {next && (
            <PageTrailNext href={next.href}>
              <PageTrailNextRow>
                <PageTrailNextEyebrow>Next up</PageTrailNextEyebrow>
                <PageTrailArrow
                  css-src="url(/icons/arrow-to-right.svg)"
                  aria-hidden="true"
                />
              </PageTrailNextRow>
              <PageTrailNextTitle>{next.label}</PageTrailNextTitle>
            </PageTrailNext>
          )}
        </PageTrailCtaRow>
      )}
      {hasSecondary && (
        <PageTrailSecondaryRow>
          {apiRefSummaries.length > 0 && (
            <PageTrailColumn>
              <PageTrailColumnTitle>API References</PageTrailColumnTitle>
              <PageTrailList>
                {apiRefSummaries.map((ref) => (
                  <PageTrailItem key={ref.slug}>
                    <PageTrailInternalLink href={ref.href}>
                      <PageTrailLinkGlyph
                        css-src="url(/icons/code.svg)"
                        aria-hidden="true"
                      />
                      <span>{ref.label}</span>
                    </PageTrailInternalLink>
                  </PageTrailItem>
                ))}
              </PageTrailList>
            </PageTrailColumn>
          )}
          {externalLinks.length > 0 && (
            <PageTrailColumn>
              <PageTrailColumnTitle>Related Links</PageTrailColumnTitle>
              <PageTrailList>
                {externalLinks.map((link) => (
                  <PageTrailItem key={link.href}>
                    {isExternal(link.href) ? (
                      <PageTrailExternalLink
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>{link.label}</span>
                        <PageTrailExtGlyph
                          css-src="url(/icons/ext-arrow.svg)"
                          aria-hidden="true"
                        />
                      </PageTrailExternalLink>
                    ) : (
                      <PageTrailInternalLink href={link.href}>
                        <PageTrailLinkGlyph
                          css-src="url(/icons/code.svg)"
                          aria-hidden="true"
                        />
                        <span>{link.label}</span>
                      </PageTrailInternalLink>
                    )}
                  </PageTrailItem>
                ))}
              </PageTrailList>
            </PageTrailColumn>
          )}
        </PageTrailSecondaryRow>
      )}
    </PageTrailSection>
  );
};
