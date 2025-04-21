import { styled } from "@salty-css/react/styled";
import { DynamicLink } from "../dynamic-link/dynamic-link";
import { fadeIn } from "../../styles/animations.css";

export const HeaderWrapper = styled("header", {
  base: {
    padding: "{spacing.large} {spacing.pageMargin}",
    borderBottom: "1px solid {theme.altBackground}",
    textStyle: "body.regular",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export const HeaderLogo = styled(DynamicLink, {
  base: {
    textStyle: "body.large",
    margin: 0,
    maxWidth: 150,
    zIndex: 101,
    "@smallDesktopDown": {
      maxWidth: 120,
    },
  },
});

export const Navigation = styled("nav", {
  base: {
    margin: 0,
    display: "grid",
    gridAutoFlow: "column",
    gap: "{spacing.large}",
    alignItems: "center",
    "@mediumDesktopDown": {
      gap: "{spacing.medium}",
    },
    "@smallDesktopDown": {
      gap: "{spacing.small}",
    },
  },
});

export const NavigationListItem = styled("li", {
  base: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
});

export const MobileMenuButton = styled("button", {
  defaultProps: { id: "mobile-menu-button" },
  base: {
    display: "none",
    padding: 0,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    textStyle: "body.regular",
    color: "currentColor",
    "@smallDesktopDown": {
      position: "relative",
      display: "block",
      height: "2em",
      width: "2.5em",
      zIndex: 101,
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        inset: 0,
        display: "block",
        width: "1.5em",
        height: "2px",
        background: "currentColor",
        transition: "0.2s ease-out",
        margin: "auto",
      },
      "&::before": {
        transform: "translateY(-0.25em)",
      },
      "&::after": {
        transform: "translateY(0.25em)",
      },
      "&:hover::before, &:hover::after": {
        opacity: 0.5,
      },
      "&.open": {
        "&::before": {
          transform: "translateY(0) rotate(45deg)",
        },
        "&::after": {
          transform: "translateY(0) rotate(-45deg)",
        },
      },
    },
  },
});

export const HeaderClientWrapper = styled("div", {
  base: {
    display: "contents",
  },
});

export const Links = styled("ul", {
  defaultProps: { id: "main-links" },
  base: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: "{spacing.medium}",
    "@smallDesktopDown": {
      display: "none",
      "&.open": {
        animation: fadeIn,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "{spacing.small}",
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 100,
        padding: "{spacing.screen.medium}",
        background: "{theme.background}",
      },
    },
  },
});

export const NavLink = styled(DynamicLink, {
  base: {
    textStyle: "body.regular",
    padding: "0.3em 0.1em",
    textDecoration: "underline",
    textDecorationColor: "transparent",
    textDecorationThickness: "1px",
    textUnderlineOffset: "0.3em",
    transition: "0.2s ease-out",
    "&:where(:hover, :focus-visible)": {
      textDecorationColor: "currentcolor",
    },
    "&.active": {
      textDecorationColor: "currentcolor",
    },
    "@smallDesktopDown": {
      textStyle: "headline.large",
      padding: "0.2em 0",
    },
  },
});

export const Divider = styled("div", {
  base: {
    width: "1px",
    height: "1.5em",
    background: "currentcolor",
    opacity: 0.2,
    "@smallDesktopDown": {
      display: "none",
    },
  },
});

export const Actions = styled("ul", {
  base: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: "{spacing.small}",
    "@smallDesktopDown": {
      gridColumn: "1 / 2",
    },
    "@smallMobileDown": {
      display: "none",
    },
  },
});

export const HeaderAction = styled(DynamicLink, {
  base: {
    textStyle: "body.regular",
    padding: "0.5em",
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

export const HeaderButton = styled(DynamicLink, {
  base: {
    textStyle: "body.regular",
    padding: "0.4em 1em",
    background: "{theme.altBackground}",
    border: "none",
    borderRadius: "10em",
    cursor: "pointer",
    display: "flex",
    gap: "{spacing.small}",
    alignItems: "center",
    textDecoration: "none",
    color: "currentColor",
    transition: "0.2s ease-out",
    "--icon-size": "1em",
    "--icon-color": "#ffd700",
    ".text": {
      transform: "translateY(0.05em)",
    },
    "@smallDesktopDown": {
      display: "none",
    },
    "&:where(:hover, :focus-visible)": {
      background: "#ffd700",
      color: "{theme.background} !important",
      "--icon-color": "currentColor",
    },
  },
});

export const HeaderActionSvg = styled("svg", {
  base: {
    width: "var(--icon-size, 1.2em)",
    height: "var(--icon-size, 1.2em)",
    transition: "0.1s ease-out",
  },
});
