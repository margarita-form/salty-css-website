import { styled } from "@salty-css/react/styled";
import Link from "next/link";

export const BreadcrumbNav = styled("nav", {
  base: {
    textStyle: "body.small",
    // marginBottom: "{spacing.large}",
    "@smallDesktopDown": {
      marginTop: "{spacing.medium}",
    },
  },
});

export const BreadcrumbList = styled("ol", {
  base: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.5em",
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
});

export const BreadcrumbItem = styled("li", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5em",
    "&:not(:first-child)::before": {
      content: '"›"',
      opacity: 0.5,
      display: "inline-block",
    },
  },
});

export const BreadcrumbLink = styled(Link, {
  base: {
    textDecoration: "none",
    color: "inherit",
    opacity: 0.7,
    transition: "0.2s ease-out",
    "&:where(:hover, :focus-visible)": {
      opacity: 1,
      color: "{theme.highlight}",
    },
  },
});

export const BreadcrumbText = styled("span", {
  base: {
    color: "inherit",
    opacity: 0.7,
    "&[aria-current='page']": {
      color: "{theme.color}",
      fontWeight: "400",
      opacity: 1,
    },
  },
});

export const DocPreheading = styled("p", {
  className: "doc-preheading",
  priority: 3,
  base: {
    margin: "0.75em 0 4em",
    padding: 0,
    fontWeight: "300",
    fontSize: "{fontSize.body.small}",
    letterSpacing: "0.01em",
    lineHeight: "1.4em",
    color: "{theme.altColor}",
    opacity: 0.7,
    maxWidth: "100%",
    "&::before": {
      content: '"/"',
      display: "inline-block",
      marginRight: "0.5em",
    },
  },
});
