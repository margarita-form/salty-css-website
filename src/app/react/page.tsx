import { Metadata } from "next";
import { BodyRegular } from "../../components/body.css";
import { HeadingLarge } from "../../components/heading.css";
import { Centered, Main } from "../../components/main.css";
import { Button } from "../../components/button/button.css";

export const metadata: Metadata = {
  title: "Salty CSS - CSS-in-JS for React",
  description:
    "Build time CSS-in-JS library for React and Server Components, built with TypeScript.",
  openGraph: {
    images: [
      {
        url: "https://salty-css.dev/assets/banners/salty-css-meta-default.jpg",
      },
    ],
  },
};

export default function Home() {
  return (
    <Main>
      <Centered>
        <HeadingLarge element="h1">CSS in JS for React</HeadingLarge>
        <BodyRegular>Coming soon</BodyRegular>
        <Button href="https://www.npmjs.com/package/@salty-css/react">
          View package in NPM
        </Button>
      </Centered>
    </Main>
  );
}
