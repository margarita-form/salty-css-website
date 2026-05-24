import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown/markdown";
import { DocPageWrapper } from "../../data/doc-page.css";
import { DOC_ORDER } from "../../data/docs-order";
import {
  applicableFrameworks,
  loadDocSource,
  parseFrontmatter,
  sourceFilenameFor,
} from "@/lib/docs-content";
import { docsParser } from "@/lib/docs-parser";
import {
  FRAMEWORK_IDS,
  frameworkData,
  isFrameworkId,
  type FrameworkId,
} from "@/lib/frameworks";
import { DocsAside } from "../../components/docs-aside";
import { DocsNavigation } from "../../components/docs-nav";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { DocsLayoutArticle } from "../../docs-layout.css";
import {
  DEFAULT_OG_IMAGE,
  assertPreHeadlineDivergent,
  buildAlternateLinks,
  buildDocDescription,
  buildDocKeywords,
  buildDocTitle,
  canonicalPathFor,
  canonicalUrlFor,
  resolveCategory,
  resolveIntent,
  resolvePreHeadline,
  resolveTopic,
  resolveVisibleHeading,
} from "@/lib/docs-seo";
import { DocStructuredData } from "@/components/seo/doc-structured-data";
import { DocPageHeading } from "@/components/doc-page-heading";

const loadSnippet = async (path: string): Promise<string> => {
  try {
    const mod = await import(`@/content/docs/snippets/${path}.md`);
    return mod.default as string;
  } catch {
    return "";
  }
};

const slugSegments = (slug: string): string[] =>
  slug === "" ? [] : slug.split("/");

export const generateStaticParams = async () => {
  const out: { framework: string; slug: string[] }[] = [];
  for (const slug of DOC_ORDER) {
    for (const fw of FRAMEWORK_IDS) {
      const raw = await loadDocSource(slug, fw);
      const { data } = parseFrontmatter(raw, sourceFilenameFor(slug, fw));
      if (!applicableFrameworks(data).includes(fw)) continue;
      out.push({ framework: fw, slug: slugSegments(slug) });
    }
  }
  return out;
};

type DocsPageProps = {
  params: Promise<{ framework: string; slug?: string[] }>;
};

export async function generateMetadata({
  params,
}: DocsPageProps): Promise<Metadata> {
  const { framework, slug: slugArray } = await params;
  if (!isFrameworkId(framework))
    throw new Error(`Unknown framework: ${framework}`);
  const slug = slugArray ? slugArray.join("/") : "";
  const raw = await loadDocSource(slug, framework);
  const { data } = parseFrontmatter(raw, sourceFilenameFor(slug, framework));
  if (!data.title) throw new Error(`Missing frontmatter title for ${slug}`);

  const topic = resolveTopic(data);
  const category = resolveCategory(data);
  const intent = resolveIntent(data);
  const title = buildDocTitle({ topic, category, framework });
  const description = buildDocDescription({
    intent,
    topic,
    category,
    framework,
  });
  const keywords = buildDocKeywords({
    keywords: data.keywords,
    topic,
    framework,
  });
  const canonical = canonicalPathFor(framework, slug);
  const url = canonicalUrlFor(framework, slug);

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      siteName: "Salty CSS",
      locale: "en_US",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

const DocsPage = async ({ params }: DocsPageProps) => {
  const { framework, slug: slugArray } = await params;
  if (!isFrameworkId(framework)) notFound();
  const fw: FrameworkId = framework;
  const slug = slugArray ? slugArray.join("/") : "";

  const raw = await loadDocSource(slug, fw);
  const { data, body } = parseFrontmatter(raw, sourceFilenameFor(slug, fw));
  if (!applicableFrameworks(data).includes(fw)) notFound();

  const { body: rendered } = await docsParser(
    { body },
    {
      variables: { ...frameworkData(fw) } as Record<string, unknown>,
      loadSnippet,
    },
  );

  const topic = resolveTopic(data);
  const category = resolveCategory(data);
  const metaTitle = buildDocTitle({ topic, category, framework: fw });
  const fileLabel = sourceFilenameFor(slug, fw);
  const preHeadline = resolvePreHeadline(data, fw, fileLabel);
  const visibleHeading = resolveVisibleHeading(data, fw, fileLabel);
  assertPreHeadlineDivergent(preHeadline, metaTitle, fileLabel);

  if (/^\s*#\s+/.test(rendered)) {
    throw new Error(
      `${fileLabel}: leading "# Heading" in body is no longer supported — move to frontmatter "visibleHeading"`,
    );
  }

  const available = applicableFrameworks(data);
  const alternates = buildAlternateLinks({
    slug,
    topic,
    currentFramework: fw,
    availableFrameworks: available,
  });

  return (
    <>
      {alternates.map((alt) => (
        <link
          key={alt.framework}
          rel="alternate"
          href={alt.href}
          title={alt.title}
          data-framework={alt.framework}
        />
      ))}
      <DocStructuredData
        data={data}
        body={rendered}
        slug={slug}
        framework={fw}
      />
      <DocsNavigation framework={framework} />
      <DocsLayoutArticle>
        <DocPageWrapper>
          <Breadcrumbs
            framework={fw}
            slug={slug}
            topic={topic}
            preHeadline={preHeadline}
          />
          <DocPageHeading
            preHeadline={preHeadline}
            visibleHeading={visibleHeading}
          />
          <Markdown content={rendered} />
        </DocPageWrapper>
      </DocsLayoutArticle>
      <DocsAside />
    </>
  );
};

export default DocsPage;
