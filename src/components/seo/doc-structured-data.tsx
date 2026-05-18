import type { FrameworkId } from "@/lib/frameworks";
import type { DocFrontmatter } from "@/lib/docs-content";
import {
  buildBreadcrumbJsonLd,
  buildDocJsonLd,
  resolveTopic,
} from "@/lib/docs-seo";

interface DocStructuredDataProps {
  data: DocFrontmatter;
  body: string;
  slug: string;
  framework: FrameworkId;
}

const Script = ({ json }: { json: Record<string, unknown> }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
  />
);

export const DocStructuredData = ({
  data,
  body,
  slug,
  framework,
}: DocStructuredDataProps) => {
  const docJson = buildDocJsonLd({ data, body, slug, framework });
  const crumb = buildBreadcrumbJsonLd({
    framework,
    slug,
    topic: resolveTopic(data),
  });
  return (
    <>
      <Script json={docJson} />
      <Script json={crumb} />
    </>
  );
};
