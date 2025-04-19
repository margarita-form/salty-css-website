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
  ];
};

const DocsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const { default: content } = await import(`../../../content/${slug}.md`);

  return (
    <DocPageWrapper>
      <Markdown content={content} />
    </DocPageWrapper>
  );
};

export default DocsPage;
