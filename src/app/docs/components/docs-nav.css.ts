import { styled } from "@salty-css/react/styled";
import { DynamicLink } from "../../../components/dynamic-link/dynamic-link";

export const DocsNavClientWrapper = styled("div", {
  base: {
    display: "contents",
  },
});

export const DocsNavigationWrapper = styled("nav", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.medium}",
    borderRight: "1px solid {theme.altBackground}",
    minHeight: "75vh",
    "@smallDesktopDown": {
      display: "none",
    },
  },
});

export const DocsNavigationGroup = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.small}",
    padding: "{spacing.medium} 0 0",
    borderTop: "1px solid {theme.altBackground}",
    maxWidth: "90%",
  },
});

export const DocsNavigationGroupTitle = styled("button", {
  defaultProps: { "data-type": "group-title" },
  base: {
    textStyle: "body.regular",
    fontWeight: "500",
    background: "none",
    textAlign: "left",
    padding: "0.2em 0",
    margin: 0,
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "0.2s ease-out",
    cursor: "pointer",
    "&:where(:hover, :focus-visible)": {
      opacity: 0.7,
    },
    "&.closed": {
      "--icon-transform": "rotate(180deg) translateY(0.05em)",
    },
  },
});

export const DocsNavigationItems = styled("ul", {
  base: {
    textStyle: "body.small",
    display: "flex",
    flexDirection: "column",
    listStyle: "none",
    padding: 0,
    margin: 0,
    "&.closed": {
      display: "none",
    },
  },
});

export const DocsNavigationItemWrapper = styled("li", {
  base: {
    padding: "0",
  },
});

export const DocsNavigationItem = styled(DynamicLink, {
  base: {
    display: "block",
    textDecoration: "none",
    opacity: 0.7,
    padding: "0.4em 0em",
    transition: "0.2s ease-out",
    position: "relative",
    "&:hover": {
      opacity: 1,
      color: "{theme.highlight} !important",
    },
    "&.active": {
      // padding: "0.3em 0.5em",
      opacity: 1,
      color: "{theme.color}",
      // background: "{theme.highlight}",
      "&::after": {
        content: '""',
        display: "block",
        position: "absolute",
        inset: "0 -0.75em",
        borderRadius: "0.25em",
        width: "calc(100% + 1.5em)",
        height: "100%",
        background: "{theme.color}",
        opacity: 0.05,
        zIndex: -1,
      },
    },
  },
});
