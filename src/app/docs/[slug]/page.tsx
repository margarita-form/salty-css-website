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

export const DocsPage = () => {
  return (
    <div>
      <p>Coming soon</p>
    </div>
  );
};

export default DocsPage;
