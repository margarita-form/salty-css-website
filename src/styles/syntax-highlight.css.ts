import { defineGlobalStyles } from "@salty-css/core/config";

export const syntaxHighlightStyles = defineGlobalStyles({
  ":not(pre) > code": {
    padding: "0.2em 0.4em",
    fontSize: "85%",
    borderRadius: "3px",
    color: "{colors.highlight}",
    backgroundColor: "{theme.terminalBackground}",
    border: "1px solid {theme.altBackground}",
    fontFamily: "monospace",
  },
});
