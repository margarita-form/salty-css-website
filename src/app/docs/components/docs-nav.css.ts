import { styled } from "@salty-css/react/styled";
import { DynamicLink } from "../../../components/dynamic-link/dynamic-link";
import { Icon } from "../../../components/icon/icon.css";
import { fadeIn, fadeInFromLeft } from "../../../styles/animations.css";

export const DocsNavClientWrapper = styled("div", {
  base: {
    display: "contents",
  },
});

export const DocsNavMobileMenuButton = styled("button", {
  base: {
    display: "none",
    textStyle: "body.regular",
    "@smallDesktopDown": {
      display: "flex",
      alignItems: "center",
      background: "transparent",
      color: "white",
      border: "none",
      padding: "0",
      marginBottom: "{spacing.large}",
      lineHeight: "1em",
      cursor: "pointer",
    },
  },
});

export const DocsNavMobileMenuButtonIcon = styled(Icon, {
  base: {
    "--icon-transform": "none",
    marginLeft: 0,
  },
});

export const DocsNavigationBackdrop = styled("div", {
  base: {
    display: "none",
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
    zIndex: 103,
    animation: fadeIn,

    "&.open": {
      display: "block",
    },
  },
});

export const DocsNavigationCloseButton = styled("button", {
  base: {
    display: "none",
    textStyle: "headline.small",
    "@smallDesktopDown": {
      display: "flex",
      alignItems: "center",
      background: "transparent",
      color: "white",
      border: "none",
      padding: "0.125em",
      margin: 0,
      lineHeight: "1em",
      position: "absolute",
      top: "{spacing.large}",
      right: "{spacing.large}",
      cursor: "pointer",
      "--icon-size": "0.75em",
    },
  },
});

export const DocsNavigationWrapper = styled("nav", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.medium}",
    borderRight: "1px solid {theme.altBackground}",
    minHeight: "75vh",
    padding: "0 {spacing.medium} 0 0",
    "@smallDesktopDown": {
      "&:not(.open)": {
        display: "none",
      },
      animation: fadeInFromLeft,
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      padding: "{spacing.large}",
      background: "{theme.background}",
      zIndex: 104,
      width: "90vw",
      maxWidth: "350px",
      overflowY: "auto",
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
    "@smallDesktopDown": {
      maxWidth: "100%",
    },
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
      "--icon-transform": "rotate(-90deg) translateY(0.05em)",
    },
    "&:has(+ ul a.active)": {
      "--icon-transform": "rotate(0deg) translateY(0.05em)",
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
    "&:has(a.active)": {
      display: "flex",
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
      opacity: 1,
      color: "{theme.color}",
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
