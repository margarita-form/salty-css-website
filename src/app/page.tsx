import { Metadata } from "next";
import { HeroBlock } from "../blocks/hero-block/hero-block";
import { CardsBlock } from "../blocks/cards-block/cards-block";
import { BodyLarge } from "../components/body.css";
import { Button } from "../components/button/button.css";
import { HeadingLarge, HeadingRegular } from "../components/heading.css";
import { Main } from "../components/main.css";
import { Icon } from "../components/icon/icon.css";
import { Wrapper } from "../components/wrapper.css";
import { Divider } from "../components/divider/divider.css";

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
  const featureCards = [
    {
      icon: "url(/icons/flash.svg)",
      title: "Enhanced Developer Experience with a Feature-Rich API",
      description:
        "Carefully crafted after years of tackling styling challenges in modern applications. Our comprehensive CSS-in-JS API brings joy back to styling while delivering the power and flexibility needed for complex UI development.",
      theme: {
        color: "#0088FF", // Futuristic Blue
        glowColor: "rgba(0, 136, 255, 0.3)",
        bgColor: "#0A0A0A",
        borderColor: "#333333",
        textColor: "#eee",
      },
    },
    {
      icon: "url(/icons/shield.svg)",
      title: "Complete TypeScript Integration with Build-Time Optimization",
      description:
        "Enjoy rock-solid type safety that catches styling errors before they reach production, paired with efficient build-time compilation that keeps your runtime bundle lean and performance optimized for all users.",
      theme: {
        color: "#FF3E9A", // Magenta
        glowColor: "rgba(255, 62, 154, 0.3)",
        bgColor: "#0A0A0A",
        borderColor: "#333333",
        textColor: "#eee",
      },
    },
    {
      icon: "url(/icons/code.svg)",
      title: "Framework-Agnostic Solution for All TypeScript Projects",
      description:
        "Seamlessly integrate with React Server Components, Next.js, Astro, Vite, and beyond. Salty CSS adapts to your technology stack, providing consistent styling capabilities across your entire TypeScript ecosystem.",
      theme: {
        color: "#FFD732", // Yellow
        glowColor: "rgba(255, 215, 50, 0.3)",
        bgColor: "#0A0A0A",
        borderColor: "#333333",
        textColor: "#eee",
      },
    },
  ];

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

      <CardsBlock
        title={
          <>
            <Divider variant="simple" width="full" />
            <Wrapper width="large">
              <HeadingRegular>
                CSS-in-JS that doesn&apos;t overcomplicate classes or bloat your
                runtime and tank your performance scores.
              </HeadingRegular>
            </Wrapper>
          </>
        }
        cards={featureCards}
      />
    </Main>
  );
}
