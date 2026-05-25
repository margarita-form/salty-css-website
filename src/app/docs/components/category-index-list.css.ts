import { styled } from "@salty-css/react/styled";
import Link from "next/link";

export const CategoryIndexListSection = styled("section", {
  className: "category-index-list",
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.medium}",
    marginTop: "{spacing.large}",
  },
});

export const CategoryIndexListEyebrow = styled("p", {
  base: {
    margin: 0,
    textStyle: "body.xs",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: "{colors.altWhite}",
    opacity: 0.6,
  },
});

export const CategoryIndexListItems = styled("ul", {
  base: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.medium}",
  },
});

export const CategoryIndexListItem = styled("li", {
  base: {
    margin: 0,
    padding: 0,
  },
});

export const CategoryIndexLink = styled(Link, {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "calc({spacing.small} / 2)",
    padding: "{spacing.medium}",
    borderRadius: "10px",
    border: "1px solid {colors.altBlack}",
    textDecoration: "none",
    color: "{colors.white}",
    transition: "border-color 0.15s ease, background-color 0.15s ease",
    "&:hover": {
      borderColor: "{colors.highlight}",
      backgroundColor: "{colors.altBlack}",
    },
    "&:focus-visible": {
      outline: "2px solid {colors.highlight}",
      outlineOffset: "2px",
    },
  },
});

export const CategoryIndexLinkTitle = styled("span", {
  base: {
    textStyle: "body.regular",
    fontWeight: 600,
    color: "{colors.white}",
  },
});

export const CategoryIndexLinkDescription = styled("span", {
  base: {
    textStyle: "body.small",
    color: "{colors.altWhite}",
    opacity: 0.8,
  },
});
