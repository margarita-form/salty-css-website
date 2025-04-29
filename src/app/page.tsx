import { Metadata } from "next";
import { HeroBlock } from "../blocks/hero-block/hero-block";
import { BodyLarge } from "../components/body.css";
import { Button } from "../components/button/button.css";
import { HeadingLarge } from "../components/heading.css";
import { Main } from "../components/main.css";
import { Icon } from "../components/icon/icon.css";

export const metadata: Metadata = {
  title: "Salty CSS - CSS-in-JS for React, Next.js, Vite and RSC",
  description:
    "Build time CSS-in-JS library compatible with React, Next.js, Vite and React Server Components built with TypeScript.",
  openGraph: {
    images: [
      {
        url: "https://salty-css.dev/assets/banners/salty-css-meta-default.jpg",
      },
    ],
  },
};

export default async function Home() {
  return (
    <Main>
      <HeroBlock>
        <HeadingLarge element="h1">
          New recipe for styling your components just dropped
        </HeadingLarge>
        <BodyLarge>
          Start by adding a pintch of Salty CSS to your app.
        </BodyLarge>

        <Button href="/docs">
          Read the docs
          <Icon css-src="url(/icons/arrow-to-right.svg)" />
        </Button>
      </HeroBlock>
    </Main>
  );
}
