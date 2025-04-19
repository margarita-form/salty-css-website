import { styled } from "@salty-css/react/styled";

export const DocsLayoutWrapper = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "240px 3fr",
    gap: "{spacing.large}",
    padding: "{spacing.large} {spacing.screen.medium}",
    "@smallDesktopDown": {
      gridTemplateColumns: "1fr",
    },
  },
});
