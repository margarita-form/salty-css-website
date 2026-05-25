import { styled } from "@salty-css/react/styled";
import Link from "next/link";
import { fadeIn } from "../../../styles/animations.css";
import { Icon } from "../../../components/icon/icon.css";

export const PageTrailSection = styled("aside", {
  className: "page-trail",
  base: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.medium}",
    marginTop: "calc({spacing.large} * 2)",
    padding: "{spacing.large}",
    borderRadius: 0,
    backgroundColor: "{colors.black}",
    border: "1px solid {theme.altBackground}",
    overflow: "hidden",
    animation: fadeIn,
    "@largeMobileDown": {
      padding: "{spacing.medium}",
      marginTop: "{spacing.large}",
    },
  },
});

export const PageTrailEyebrow = styled("h4", {
  base: {
    textStyle: "body.xs",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    opacity: 0.6,
    margin: "0 0 1em",
  },
});

export const PageTrailCtaRow = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "1.5fr 2.5fr",
    gap: "{spacing.large}",
    alignItems: "start",
    "& > :nth-child(2)": {
      borderLeft: "1px solid #1f1f1f",
      paddingLeft: "{spacing.large}",
    },
    "&[data-has-prev='false']": {
      gridTemplateColumns: "1fr",
    },
    "@largeMobileDown": {
      gridTemplateColumns: "1fr",
      gap: "{spacing.medium}",
      "& > :nth-child(2)": {
        borderLeft: "none",
        paddingLeft: 0,
      },
    },
  },
});

const ctaBase = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: "{spacing.small}",
  padding: 0,
  color: "{colors.white}",
  textDecoration: "none",
  transition: "color 0.2s ease-out",
} as const;

export const PageTrailPrev = styled(Link, {
  base: {
    ...ctaBase,
    justifyContent: "center",
    "&:where(:hover, :focus-visible)": {
      color: "{colors.highlight}",
    },
    "@largeMobileDown": {
      order: 2,
    },
  },
});

export const PageTrailPrevRow = styled("span", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "1em",
    textStyle: "body.xs",
    opacity: 0.7,
  },
});

export const PageTrailPrevEyebrow = styled("span", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35em",
    textStyle: "body.xs",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
  },
});

export const PageTrailPrevTitle = styled("span", {
  base: {
    textStyle: "headline.small",
    lineHeight: "1.3",
  },
});

export const PageTrailNext = styled(Link, {
  base: {
    ...ctaBase,
    "&:where(:hover, :focus-visible)": {
      color: "{colors.highlight}",
    },
    "@largeMobileDown": {
      order: 1,
    },
  },
});

export const PageTrailNextRow = styled("span", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "1em",
    textStyle: "body.xs",
    opacity: 0.7,
  },
});

export const PageTrailNextEyebrow = styled("span", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35em",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: "currentColor",
  },
});

export const PageTrailNextTitle = styled("span", {
  className: "page-trail-next-title",
  base: {
    textStyle: "headline.small",
    lineHeight: "1.15",
    transition: "color 0.2s ease-out",
  },
});

export const PageTrailArrow = styled(Icon, {
  className: "page-trail-arrow",
  base: {
    width: "1em",
    height: "1em",
    transition: "transform 0.25s ease-out",
    transform: "translateY(0)",
    marginInline: 0,
  },
});

export const PageTrailSecondaryRow = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "{spacing.large}",
    marginTop: "{spacing.medium}",
    paddingTop: "{spacing.medium}",
    borderTop: "1px solid #1f1f1f",
    "@largeMobileDown": {
      gridTemplateColumns: "1fr",
      gap: "{spacing.medium}",
    },
  },
});

export const PageTrailColumn = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.small}",
  },
});

export const PageTrailColumnTitle = styled("h3", {
  base: {
    margin: 0,
    textStyle: "body.xs",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    opacity: 0.55,
    fontWeight: "500",
  },
});

export const PageTrailList = styled("ul", {
  base: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
});

export const PageTrailItem = styled("li", {
  base: {
    margin: 0,
  },
});

const linkBase = {
  display: "inline-flex",
  alignItems: "baseline",
  gap: "0.55em",
  padding: "6px 0",
  textStyle: "body.small",
  color: "{colors.white}",
  textDecoration: "none",
  transition: "color 0.2s ease-out",
  lineHeight: "1.4",
  "&:where(:hover, :focus-visible)": {
    color: "{colors.highlight}",
  },
  "&:where(:hover, :focus-visible) .page-trail-link-glyph": {
    transform: "translateX(3px)",
  },
  "&:where(:hover, :focus-visible) .page-trail-ext-glyph": {
    transform: "translate(2px, -2px)",
  },
} as const;

export const PageTrailInternalLink = styled(Link, {
  base: linkBase,
});

export const PageTrailExternalLink = styled("a", {
  base: linkBase,
});

export const PageTrailLinkGlyph = styled(Icon, {
  className: "page-trail-link-glyph",
  base: {
    width: "1.1em",
    height: "1.1em",
    color: "{colors.highlight}",
    flexShrink: 0,
    transition: "transform 0.2s ease-out",
    transform: "translate(0, 0)",
    marginInline: 0,
    alignSelf: "center",
  },
});

export const PageTrailExtGlyph = styled(Icon, {
  className: "page-trail-ext-glyph",
  base: {
    width: "0.8em",
    height: "0.8em",
    color: "{colors.highlight}",
    flexShrink: 0,
    transition: "transform 0.2s ease-out",
    transform: "translate(0, 0)",
    marginInline: 0,
    alignSelf: "center",
  },
});
