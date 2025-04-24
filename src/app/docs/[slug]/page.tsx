import { Markdown } from "../../../components/markdown/markdown";
import { DocPageWrapper } from "./doc-page.css";

const docPages = [
  {
    slug: "quick-start",
    title: "Salty CSS Quick Start",
    description: "Get to know the basics of Salty CSS.",
  },
  {
    slug: "installation",
    title: "How to Install Salty CSS",
    description: "Learn how to install Salty CSS in your project.",
  },
  {
    slug: "usage",
    title: "How to Use Salty CSS",
    description: "Learn how to use Salty CSS in your project.",
  },
  {
    slug: "faq",
    title: "Salty CSS Frequently Asked Questions",
    description: "Find answers to common questions about Salty CSS.",
  },
  {
    slug: "cli",
    title: "Salty CSS CLI",
    description: "Learn how to use the Salty CSS in the command line.",
  },
  {
    slug: "basics",
    title: "Salty CSS Styling Basics",
    description: "Learn the basics of styling components with Salty CSS.",
  },
  {
    slug: "variants",
    title: "Salty CSS Variants",
    description: "Learn how to use variants in Salty CSS components.",
  },
  {
    slug: "classnames",
    title: "Salty CSS Classnames",
    description: "Learn how to use classnames function in Salty CSS.",
  },
  {
    slug: "overrides",
    title: "Salty CSS Overrides",
    description: "Learn how to override component styles in Salty CSS.",
  },
  {
    slug: "animations",
    title: "Salty CSS Animations",
    description: "Learn how to use animations in Salty CSS.",
  },
  {
    slug: "color-function",
    title: "Salty CSS Color Function",
    description: "Learn how to use the color function in Salty CSS.",
  },
  {
    slug: "templates",
    title: "Salty CSS Templates",
    description: "Learn how to use templates for reusable styles in Salty CSS.",
  },
  {
    slug: "media-queries",
    title: "Salty CSS Media Queries",
    description: "Learn how to use media queries and breakpoints in Salty CSS.",
  },
  {
    slug: "viewport-clamp",
    title: "Salty CSS Viewport Clamp",
    description: "Learn how to add a viewport clamp to your Salty CSS project.",
  },
];

export const generateStaticParams = async () => {
  return docPages;
};

type DocsPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: DocsPageProps) {
  const { slug } = await params;
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
  const { slug } = await params;
  const { default: content } = await import(`../../../content/docs/${slug}.md`);

  return (
    <DocPageWrapper>
      <Markdown content={content} />
    </DocPageWrapper>
  );
};

export default DocsPage;
