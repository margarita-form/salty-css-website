import { styled } from "@salty-css/react/styled";
import { DynamicLink } from "../../../components/dynamic-link/dynamic-link";

export const DocsAsideWrapper = styled("aside", {
  base: {
    position: "sticky",
    top: "{spacing.large}",
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.medium}",
    height: "fit-content",
    "@mediumDesktopDown": {
      display: "none",
    },
  },
});

export const DocsAsideLinks = styled("ul", {
  base: {
    display: "flex",
    flexDirection: "column",
    textStyle: "body.small",
    gap: "{spacing.small}",
    padding: "0",
    listStyle: "none",
  },
});

export const DocsAsideLinkWrapper = styled("li", {
  base: {},
});

export const DocsAsideLink = styled(DynamicLink, {
  base: {
    textDecoration: "none",
    transition: "0.2s ease-out",
    opacity: 0.6,
    "&.active": {
      opacity: 1,
    },
    "&:where(:hover, :focus-visible)": {
      opacity: 1,
    },
    "&:not(.level-H1, .level-H2)": {
      "&::before": {
        content: "'- '",
        marginRight: "0.2em",
        opacity: 0.8,
      },
    },
  },
});
