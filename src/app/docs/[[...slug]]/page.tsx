import { Markdown } from "../../../components/markdown/markdown";
import { DocPageWrapper } from "./doc-page.css";
import { docPages } from "./doc-pages";

export const generateStaticParams = async () => {
  return docPages.map(({ slug }) => ({
    slug: slug.split("/"),
  }));
};

type DocsPageProps = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: DocsPageProps) {
  const { slug: slugArray } = await params;
  const slug = slugArray ? slugArray.join("/") : "";
  const page = docPages.find((page) => page.slug === slug);
  if (!page) throw new Error("Page not in available docs");
  const { title, description } = page;

  return {
    title,
    description,
    openGraph: {
      images: [
        {
          url: "https://salty-css.dev/assets/banners/salty-css-meta-default.jpg",
        },
      ],
    },
  };
}

const DocsPage = async ({ params }: DocsPageProps) => {
  const { slug: slugArray } = await params;
  const slug = slugArray ? slugArray.join("-") : "temp";
  const { default: content } = await import(`../../../content/docs/${slug}.md`);

  return (
    <DocPageWrapper>
      <Markdown content={content} />
    </DocPageWrapper>
  );
};

export default DocsPage;
