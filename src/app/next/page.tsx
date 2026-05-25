import { Metadata } from "next";
import Link from "next/link";
import { HeroBlock } from "../../blocks/hero-block/hero-block";
import { BodyRegular } from "../../components/body.css";
import { HeadingLarge } from "../../components/heading.css";
import { Main } from "../../components/main.css";
import { Button } from "../../components/button/button.css";
import { Icon } from "../../components/icon/icon.css";
import { CodeBlock } from "../../components/markdown/code-block";
import { getFramework } from "../../lib/frameworks";
import {
  ButtonRow,
  DocsLinkList,
  PageSection,
  SectionHeading,
  SectionInner,
} from "./page.css";
import { CodeBlockWrapper } from "../../components/markdown/markdown.css";

export const metadata: Metadata = {
  title: "Salty CSS - CSS-in-JS for Next.js",
  description:
    "Salty CSS served fresh from the App Router — zero-runtime styles that work with React Server Components.",
  openGraph: {
    images: [
      {
        url: "https://salty-css.dev/assets/banners/salty-css-meta-default.jpg",
      },
    ],
  },
};

const framework = getFramework("next");

const snippet = `// app/components/button.css.ts
import { styled } from "${framework.data.styledImport}";

export const Button = styled("button", {
  base: {
    padding: "0.75rem 1.25rem",
    borderRadius: "6px",
    background: "{theme.color}",
    color: "white",
  },
});
`;

export default function NextMarketingPage() {
  return (
    <Main>
      <HeroBlock>
        <HeadingLarge element="h1">
          Salty CSS, served fresh from the App Router
        </HeadingLarge>
        <BodyRegular style={{ maxWidth: "620px" }}>
          Zero-runtime styles that work with React Server Components — no client
          bundle tax, no hydration mismatch dance.
        </BodyRegular>
        <ButtonRow>
          <Button href="/docs/next/installation/">
            Read the docs
            <Icon css-src="url(/icons/arrow-to-right.svg)" />
          </Button>
          <Button href="https://www.npmjs.com/package/@salty-css/next">
            View on NPM
          </Button>
        </ButtonRow>
      </HeroBlock>

      <PageSection>
        <SectionInner>
          <SectionHeading>Install both packages</SectionHeading>
          <BodyRegular>
            Next.js needs the <code>@salty-css/next</code> plugin alongside the
            React runtime helpers — one command takes care of both.
          </BodyRegular>
          <CodeBlockWrapper>
            <CodeBlock code={`npx salty-css init`} lang="bash" />
          </CodeBlockWrapper>
          <BodyRegular>
            Save your styles as a <code>*.css.ts</code> sibling. Server
            components, client components, App Router, Pages Router — no extra
            glue.
          </BodyRegular>
          <CodeBlockWrapper>
            <CodeBlock code={snippet} lang="ts" />
          </CodeBlockWrapper>
          <BodyRegular>
            Works on Next.js 15 and 16 with either Webpack or Turbopack —{" "}
            <code>withSaltyCss</code> auto-detects which one your dev server is
            using.
          </BodyRegular>
        </SectionInner>
      </PageSection>

      <PageSection>
        <SectionInner>
          <SectionHeading>Where to next?</SectionHeading>
          <BodyRegular>A few good places to keep tasting:</BodyRegular>
          <DocsLinkList>
            <li>
              <Link href="/docs/next/installation/">Installation</Link> — wire
              up <code>withSaltyCss</code> in <code>next.config.ts</code>.
            </li>
            <li>
              <Link href="/docs/next/quick-start/">Quick Start</Link> — from{" "}
              <code>npx salty-css init</code> to your first styled component.
            </li>
            <li>
              <Link href="/docs/next/basics/">Component styles</Link> — the full{" "}
              <code>styled</code> API.
            </li>
            <li>
              <Link href="/docs/next/variants/">Variants</Link> — prop-driven
              styles and compound variants.
            </li>
            <li>
              <Link href="/docs/next/templates/">Templates</Link> — reusable
              style recipes with <code>defineTemplates</code>.
            </li>
          </DocsLinkList>
        </SectionInner>
      </PageSection>
    </Main>
  );
}
