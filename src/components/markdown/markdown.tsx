import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BodyRegular } from "../body.css";
import { HeadingRegular, HeadingSmall } from "../heading.css";
import { MarkdownTable, TableWrapper } from "./markdown.css";
import { CodeBlock } from "./code-block";
import { Li, Ol, Ul } from "../lists.css";

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
      remarkPlugins={[remarkGfm]}
      components={{
        h1: (props) => {
          const id = getID(props.children);
          return <HeadingRegular element="h1" id={id} {...props} />;
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

        // Lists
        ul: (props) => <Ul {...props} />,
        ol: (props) => <Ol {...props} />,
        li: (props) => <Li {...props} />,

        // Table components
        table: (props) => (
          <TableWrapper>
            <MarkdownTable {...props} />
          </TableWrapper>
        ),
        thead: (props) => <thead {...props} />,
        tbody: (props) => <tbody {...props} />,
        tr: (props) => <tr {...props} />,
        th: (props) => <th {...props} />,
        td: (props) => <td {...props} />,

        // Code
        code: ({ className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          const language = match ? match[1] : "";

          if (!className) {
            return (
              <code {...props} className={className}>
                {children}
              </code>
            );
          }

          return (
            <CodeBlock
              lang={language}
              code={String(children).replace(/\n$/, "")}
            />
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
