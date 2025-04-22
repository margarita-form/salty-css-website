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
    textStyle: "body.regular",
    color: "{theme.text}",
    textDecoration: "none",
    transition: "0.2s ease-out",
    "&:where(:hover, :focus-visible)": {
      opacity: 0.7,
    },
  },
});
