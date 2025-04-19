import { HeroBlock } from "../blocks/hero-block/hero-block";
import { BodyLarge } from "../components/body.css";
import { Button } from "../components/button/button.css";
import { HeadingLarge } from "../components/heading.css";
import { Main } from "../components/main.css";

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

        <Button href="/docs">Read the docs</Button>
      </HeroBlock>
    </Main>
  );
}
