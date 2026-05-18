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
  title: "Salty CSS - CSS-in-JS for React",
  description:
    "Sprinkle Salty CSS on your React app — build-time CSS-in-TS that ships zero runtime.",
  openGraph: {
    images: [
      {
        url: "https://salty-css.dev/assets/banners/salty-css-meta-default.jpg",
      },
    ],
  },
};

const framework = getFramework("react");

const snippet = `// components/button.css.ts
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

export default function ReactMarketingPage() {
  return (
    <Main>
      <HeroBlock>
        <HeadingLarge element="h1">
          Sprinkle Salty CSS on your React app
        </HeadingLarge>
        <BodyRegular style={{ maxWidth: "420px" }}>
          Build-time CSS-in-TS that ships zero runtime — and feels right at home
          next to your components.
        </BodyRegular>
        <ButtonRow>
          <Button href="/docs/react/quick-start/">
            Read the docs
            <Icon css-src="url(/icons/arrow-to-right.svg)" />
          </Button>
          <Button href="https://www.npmjs.com/package/@salty-css/react">
            View on NPM
          </Button>
        </ButtonRow>
      </HeroBlock>

      <PageSection>
        <SectionInner>
          <SectionHeading>Install in one line</SectionHeading>
          <BodyRegular>
            Add a pinch of salt to any React project — Vite, Webpack, or your
            own bundler.
          </BodyRegular>
          <CodeBlockWrapper>
            <CodeBlock code={`npx salty-css init`} lang="bash" />
          </CodeBlockWrapper>
          <BodyRegular>
            Then drop this in a <code>button.css.ts</code> next to your
            component. The Salty plugin bakes it into real CSS at build time —
            nothing ships to the client.
          </BodyRegular>
          <CodeBlockWrapper>
            <CodeBlock code={snippet} lang="ts" />
          </CodeBlockWrapper>
        </SectionInner>
      </PageSection>

      <PageSection>
        <SectionInner>
          <SectionHeading>Where to next?</SectionHeading>
          <BodyRegular>A few good places to keep tasting:</BodyRegular>
          <DocsLinkList>
            <li>
              <Link href="/docs/react/quick-start/">Quick Start</Link> — go from
              zero to a styled component in five minutes.
            </li>
            <li>
              <Link href="/docs/react/installation/">Installation</Link> — wire
              up the Vite or Webpack plugin.
            </li>
            <li>
              <Link href="/docs/react/basics/">Component styles</Link> — the
              full <code>styled</code> API.
            </li>
            <li>
              <Link href="/docs/react/variants/">Variants</Link> — prop-driven
              styles and compound variants.
            </li>
            <li>
              <Link href="/docs/react/templates/">Templates</Link> — reusable
              style recipes with <code>defineTemplates</code>.
            </li>
          </DocsLinkList>
        </SectionInner>
      </PageSection>
    </Main>
  );
}
