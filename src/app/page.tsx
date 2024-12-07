import {
  HeadingLarge,
  HeadingRegular,
  HeadingSmall,
} from "../components/heading.css";
import { Main, WarningBox } from "../components/main.css";
import Markdown from "react-markdown";
import readme from "../content/readme.md";
import { BodyRegular } from "../components/body.css";

export default function Home() {
  return (
    <Main>
      <WarningBox data-nosnippet>
        ⚠️ Website is still under development
      </WarningBox>

      <HeadingLarge element="h1">
        CSS-in-JS library for React, Next.js, Server Components and more
      </HeadingLarge>

      <Markdown
        components={{
          h2: (props) => <HeadingRegular underlined element="h2" {...props} />,
          h3: (props) => <HeadingSmall element="h3" {...props} />,
          h4: (props) => <HeadingSmall element="h4" {...props} />,
          p: (props) => <BodyRegular element="p" {...props} />,
        }}
      >
        {readme}
      </Markdown>
    </Main>
  );
}
