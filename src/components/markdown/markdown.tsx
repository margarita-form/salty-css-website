import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { BodyRegular } from "../body.css";
import { HeadingLarge, HeadingRegular, HeadingSmall } from "../heading.css";

const getID = (children: ReactNode) => {
  if (typeof children === "string") {
    return children
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase();
  }
  return undefined;
};

interface MarkdownProps {
  content: string;
}

export const Markdown = ({ content }: MarkdownProps) => {
  return (
    <ReactMarkdown
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
      {content}
    </ReactMarkdown>
  );
};
