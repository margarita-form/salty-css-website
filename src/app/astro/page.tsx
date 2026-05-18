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
  title: "Salty CSS - CSS-in-JS for Astro",
  description:
    "Astro plus a pinch of salt — the same styled API in .astro files and React islands, extracted to plain CSS at build time.",
  openGraph: {
    images: [
      {
        url: "https://salty-css.dev/assets/banners/salty-css-meta-default.jpg",
      },
    ],
  },
};

const framework = getFramework("astro");

const snippet = `// src/components/button.css.ts
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

const astroUsage = `---
// src/pages/index.astro
import { Button } from "../components/button.css";
---

<Button>Pass the salt</Button>
`;

export default function AstroMarketingPage() {
  return (
    <Main>
      <HeroBlock>
        <HeadingLarge element="h1">Astro, with a pinch of salt</HeadingLarge>
        <BodyRegular style={{ maxWidth: "420px" }}>
          The same <code>styled</code> API in <code>.astro</code> files and
          React islands — Astro extracts it to plain CSS at build time.
        </BodyRegular>
        <ButtonRow>
          <Button href="/docs/astro/installation/">
            Read the docs
            <Icon css-src="url(/icons/arrow-to-right.svg)" />
          </Button>
          <Button href="https://www.npmjs.com/package/@salty-css/astro">
            View on NPM
          </Button>
        </ButtonRow>
      </HeroBlock>

      <PageSection>
        <SectionInner>
          <SectionHeading>Install the integration</SectionHeading>
          <BodyRegular>
            One package, then add it automatically to{" "}
            <code>astro.config.mjs</code> like any other integration.
          </BodyRegular>
          <CodeBlockWrapper>
            <CodeBlock code={`npx salty-css init`} lang="bash" />
          </CodeBlockWrapper>
          <BodyRegular>
            Define your styles in a <code>*.css.ts</code> sibling…
          </BodyRegular>
          <CodeBlockWrapper>
            <CodeBlock code={snippet} lang="ts" />
          </CodeBlockWrapper>
          <BodyRegular>
            …and use it straight from your <code>.astro</code> templates.
          </BodyRegular>
          <CodeBlockWrapper>
            <CodeBlock code={astroUsage} lang="astro" />
          </CodeBlockWrapper>
        </SectionInner>
      </PageSection>

      <PageSection>
        <SectionInner>
          <SectionHeading>Where to next?</SectionHeading>
          <BodyRegular>A few good places to keep tasting:</BodyRegular>
          <DocsLinkList>
            <li>
              <Link href="/docs/astro/installation/">Installation</Link> —
              register the Salty integration with Astro.
            </li>
            <li>
              <Link href="/docs/astro/quick-start/">Quick Start</Link> — from{" "}
              <code>npx salty-css init</code> to your first styled component.
            </li>
            <li>
              <Link href="/docs/astro/basics/">Component styles</Link> — the
              full <code>styled</code> API.
            </li>
            <li>
              <Link href="/docs/astro/variants/">Variants</Link> — prop-driven
              styles and compound variants.
            </li>
            <li>
              <Link href="/docs/astro/templates/">Templates</Link> — reusable
              style recipes with <code>defineTemplates</code>.
            </li>
          </DocsLinkList>
        </SectionInner>
      </PageSection>
    </Main>
  );
}
