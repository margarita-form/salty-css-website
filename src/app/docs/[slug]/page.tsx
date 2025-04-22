import { Markdown } from "../../../components/markdown/markdown";
import { DocPageWrapper } from "./doc-page.css";

export const generateStaticParams = async () => {
  return [
    {
      slug: "quick-start",
    },
    {
      slug: "installation",
    },
    {
      slug: "usage",
    },
    {
      slug: "faq",
    },
    {
      slug: "cli",
    },
    {
      slug: "basics",
    },
    {
      slug: "variants",
    },
    {
      slug: "classnames",
    },
    {
      slug: "overrides",
    },
    {
      slug: "animations",
    },
    {
      slug: "color-function",
    },
    {
      slug: "templates",
    },
    {
      slug: "media-queries",
    },
    {
      slug: "viewport-clamp",
    },
  ];
};

const DocsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const { default: content } = await import(`../../../content/docs/${slug}.md`);

  return (
    <DocPageWrapper>
      <Markdown content={content} />
    </DocPageWrapper>
  );
};

export default DocsPage;
