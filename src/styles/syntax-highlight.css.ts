import { defineGlobalStyles } from "@salty-css/core/config";

// Custom styles to enhance syntax highlighting appearance
export const syntaxHighlightStyles = defineGlobalStyles({
  // Style modifications for code blocks with syntax highlighting
  ".react-syntax-highlighter": {
    borderRadius: "6px !important",
    overflow: "hidden !important",
    background: "{theme.terminalBackground} !important",
    // border: "1px solid {theme.altBackground} !important",
  },

  // Style inline code
  "code:not(.react-syntax-highlighter code)": {
    padding: "0.2em 0.4em",
    fontSize: "85%",
    borderRadius: "3px",
    color: "{colors.highlight}",
    backgroundColor: "{theme.terminalBackground}",
    border: "1px solid {theme.altBackground}",
    fontFamily: "monospace",
  },

  // Highlighting for specific syntax elements
  ".token.comment, .token.prolog, .token.doctype, .token.cdata": {
    color: "#8292a2",
    fontStyle: "italic",
  },
  ".token.punctuation": {
    color: "#f8f8f2",
  },
  ".token.property, .token.tag, .token.constant, .token.symbol, .token.deleted":
    {
      color: "#f92672",
    },
  ".token.boolean, .token.number": {
    color: "#ae81ff",
  },
  ".token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted":
    {
      color: "#a6e22e",
    },
  ".token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string":
    {
      color: "#f8f8f2",
    },
  ".token.atrule, .token.attr-value, .token.keyword": {
    color: "#e6db74",
  },
  ".token.function, .token.class-name": {
    color: "#66d9ef",
  },
  ".token.regex, .token.important, .token.variable": {
    color: "#fd971f",
  },
});
