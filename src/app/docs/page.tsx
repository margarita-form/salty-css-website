import { BodyLarge, BodyRegular } from "../../components/body.css";
import { DynamicLink } from "../../components/dynamic-link/dynamic-link";
import { HeadingLarge } from "../../components/heading.css";
import { Centered, Main } from "../../components/main.css";

export default function Home() {
  return (
    <Main>
      <Centered>
        <HeadingLarge element="h1">Documentation</HeadingLarge>
        <BodyLarge>
          The documentation pages are still being written. In the meantime, you
          can check out the{" "}
          <DynamicLink href="https://github.com/margarita-form/salty-css">
            GitHub repository readme
          </DynamicLink>{" "}
          for all-in-one infomation blast.
        </BodyLarge>
      </Centered>
    </Main>
  );
}
