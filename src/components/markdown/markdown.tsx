import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BodyRegular } from "../body.css";
import { HeadingRegular, HeadingSmall } from "../heading.css";
import { CodeBlock } from "./markdown.css";
import { CopyButton } from "./copy-button";

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
        code: ({ className, children, ...props }) => {
          // Extracting the language from className (format: "language-javascript", "language-tsx", etc.)
          const match = /language-(\w+)/.exec(className || "");
          const language = match ? match[1] : "";

          if (!className) {
            // Inline code
            return (
              <code {...props} className={className}>
                {children}
              </code>
            );
          }

          // Code block with syntax highlighting
          return (
            <CodeBlock
              data-language={language}
              className={`language-${language}`}
            >
              <CopyButton textToCopy={String(children)} />
              <SyntaxHighlighter
                style={atomDark}
                language={language}
                PreTag="div"
                className="react-syntax-highlighter"
                customStyle={{
                  margin: 0,
                  padding: "1.25em 1em",
                  borderRadius: "4px",
                  fontSize: "0.9em",
                  backgroundColor: "var(--theme-terminalBackground, #111)",
                }}
                codeTagProps={{
                  className: "syntax-code",
                }}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </CodeBlock>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
