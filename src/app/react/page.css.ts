import { styled } from "@salty-css/react/styled";

export const PageSection = styled("section", {
  base: {
    width: "100%",
    padding: "0 {spacing.pageMargin}",
  },
});

export const SectionInner = styled("div", {
  base: {
    width: "100%",
    maxWidth: "720px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.medium}",
  },
});

export const SectionHeading = styled("h2", {
  base: {
    textStyle: "headline.regular",
    margin: 0,
  },
});

export const ButtonRow = styled("div", {
  base: {
    display: "flex",
    flexWrap: "wrap",
    gap: "{spacing.small}",
    justifyContent: "center",
  },
});

export const DocsLinkList = styled("ul", {
  base: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.small}",
    textStyle: "body.regular",
    "& a": {
      color: "{theme.color}",
      textDecoration: "underline",
      textUnderlineOffset: "0.2em",
      "&:hover": {
        textDecorationThickness: "2px",
      },
    },
  },
});
