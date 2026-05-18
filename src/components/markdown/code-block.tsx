import { Fragment, type JSX } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { codeToHast } from "shiki";
import { CodeBlockContainer } from "./markdown.css";
import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  code: string;
  lang: string;
}

const highlight = async (code: string, lang: string) => {
  try {
    return await codeToHast(code, { lang, theme: "one-dark-pro" });
  } catch {
    return codeToHast(code, { lang: "text", theme: "one-dark-pro" });
  }
};

export const CodeBlock = async ({ code, lang }: CodeBlockProps) => {
  const hast = await highlight(code, lang);

  const rendered = toJsxRuntime(hast, {
    Fragment,
    jsx,
    jsxs,
    components: {
      pre: ({ style, ...props }) => {
        void style;
        return <pre {...props} />;
      },
    },
  }) as JSX.Element;

  return (
    <CodeBlockContainer data-language={lang} className={`language-${lang}`}>
      <CopyButton textToCopy={code} />
      {rendered}
    </CodeBlockContainer>
  );
};
