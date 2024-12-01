import { styled } from "@salty-css/react/styled";
import { DynamicLink } from "../dynamic-link/dynamic-link";

export const HeaderWrapper = styled("header", {
  base: {
    padding: "{spacing.large} {spacing.screen.medium}",
    borderBottom: "1px solid {theme.altBackground}",
    textStyle: "body.regular",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export const HeaderLogo = styled("p", {
  base: {
    textStyle: "body.large",
    margin: 0,
  },
});

export const Navigation = styled("nav", {
  base: {
    margin: 0,
    display: "flex",
    gap: "{spacing.medium}",
  },
});

export const NavigationListItem = styled("li", {
  base: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
});

export const Actions = styled("ul", {
  base: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: "{spacing.small}",
  },
});

export const HeaderAction = styled(DynamicLink, {
  base: {
    textStyle: "body.regular",
    padding: "0.6em",
    background: "{theme.altBackground}",
    border: "none",
    borderRadius: "10em",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    color: "currentColor",
    transition: "0.2s ease",
    "&:where(:hover, :focus-visible)": {
      background: "{theme.color}",
      color: "{theme.background} !important",
    },
  },
});

export const HeaderActionSvg = styled("svg", {
  base: {
    width: "1.25em",
    height: "1.25em",
  },
});
