import { BodyRegular } from "../../components/body.css";
import { HeadingLarge } from "../../components/heading.css";
import { Centered, Main } from "../../components/main.css";

export default function Home() {
  return (
    <Main>
      <Centered>
        <HeadingLarge element="h1">Documentation</HeadingLarge>
        <BodyRegular>Coming soon</BodyRegular>
      </Centered>
    </Main>
  );
}
