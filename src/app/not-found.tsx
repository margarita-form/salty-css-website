import { Button } from "../components/button/button.css";
import { HeadingLarge } from "../components/heading.css";
import { Centered, Main } from "../components/main.css";

export default function NotFound() {
  return (
    <Main>
      <Centered>
        <HeadingLarge element="h1">
          Unfortunately, the page you were looking for seems not to exist.
        </HeadingLarge>
        <Button href="/">Go home</Button>
      </Centered>
    </Main>
  );
}
