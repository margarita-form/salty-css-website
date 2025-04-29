import { Metadata } from "next";
import { BodyRegular } from "../../components/body.css";
import { HeadingLarge } from "../../components/heading.css";
import { Centered, Main } from "../../components/main.css";

export const metadata: Metadata = {
  title: "Salty CSS - CSS-in-JS for Astro",
  description: "CSS-in-JS library for Astro.js",
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
        <HeadingLarge element="h1">CSS in JS for Astro</HeadingLarge>
        <BodyRegular>Coming soon</BodyRegular>
      </Centered>
    </Main>
  );
}
