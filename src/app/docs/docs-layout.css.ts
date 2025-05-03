import { styled } from "@salty-css/react/styled";
import { HDClamp } from "../../styles/helpers.css";

export const DocsLayoutWrapper = styled("div", {
  base: {
    display: "grid",
    "--side-size": HDClamp(260),
    gridTemplateColumns: "{side-size} 3fr {side-size}",
    gap: "{spacing.large}",
    padding: "{spacing.large} {spacing.pageMargin}",
    "@mediumDesktopDown": {
      gridTemplateColumns: "{side-size} 1fr",
      paddingTop: "{spacing.medium}",
    },
    "@smallDesktopDown": {
      display: "block",
    },
  },
});
