import {
  HeadingLarge,
  HeadingRegular,
  HeadingSmall,
} from "../components/heading.css";
import { Main, WarningBox } from "../components/main.css";
import Markdown from "react-markdown";
import readme from "../content/readme.md";
import { BodyRegular } from "../components/body.css";
import { ReactNode } from "react";

const getID = (children: ReactNode) => {
  if (typeof children === "string") {
    return children
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase();
  }
  return undefined;
};

export default function Home() {
  return (
    <Main>
      <WarningBox data-nosnippet>⚠️ Website is under construction.</WarningBox>

      <HeadingLarge element="h1">
        CSS-in-JS library for React, Next.js, Server Components and more
      </HeadingLarge>

      <Markdown
        components={{
          h1: (props) => {
            const id = getID(props.children);
            return <HeadingLarge element="h1" id={id} {...props} />;
          },
          h2: (props) => {
            const id = getID(props.children);
            return <HeadingRegular element="h2" id={id} {...props} />;
          },
          h3: (props) => {
            const id = getID(props.children);
            return <HeadingSmall element="h3" id={id} {...props} />;
          },
          h4: (props) => {
            const id = getID(props.children);
            return <HeadingSmall element="h4" id={id} {...props} />;
          },
          p: (props) => <BodyRegular element="p" {...props} />,
        }}
      >
        {readme}
      </Markdown>
    </Main>
  );
}
