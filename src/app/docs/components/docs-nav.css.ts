import { styled } from "@salty-css/react/styled";

export const DocsNavigationWrapper = styled("nav", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.medium}",
    borderRight: "1px solid {theme.altBackground}",
    "@smallDesktopDown": {
      display: "none",
    },
  },
});
