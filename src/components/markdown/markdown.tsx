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
        h1: () => {
          throw new Error(
            'Markdown body cannot contain "# Heading" — move it to frontmatter "visibleHeading".',
          );
        },
        h2: ({ node, ...props }) => {
          void node;
          const id = getID(props.children);
          return <HeadingRegular element="h2" id={id} {...props} />;
        },
        h3: ({ node, ...props }) => {
          void node;
          const id = getID(props.children);
          return <HeadingSmall element="h3" id={id} {...props} />;
        },
        h4: ({ node, ...props }) => {
          void node;
          const id = getID(props.children);
          return <HeadingSmall element="h4" id={id} {...props} />;
        },
        p: ({ node, ...props }) => { void node; return <BodyRegular element="p" {...props} />; },

        // Lists
        ul: ({ node, ...props }) => { void node; return <Ul {...props} />; },
        ol: ({ node, ...props }) => { void node; return <Ol {...props} />; },
        li: ({ node, ...props }) => { void node; return <Li {...props} />; },

        // Table components
        table: ({ node, ...props }) => {
          void node;
          return (
            <TableWrapper>
              <MarkdownTable {...props} />
            </TableWrapper>
          );
        },
        thead: ({ node, ...props }) => { void node; return <thead {...props} />; },
        tbody: ({ node, ...props }) => { void node; return <tbody {...props} />; },
        tr: ({ node, ...props }) => { void node; return <tr {...props} />; },
        th: ({ node, ...props }) => { void node; return <th {...props} />; },
        td: ({ node, ...props }) => { void node; return <td {...props} />; },

        // Code
        code: ({ className, children, node, ...props }) => {
          void node;
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
