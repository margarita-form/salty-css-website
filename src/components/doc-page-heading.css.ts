import { styled } from "@salty-css/react/styled";

export const DocHeadingGroup = styled("hgroup", {
  className: "doc-page-heading",
  base: {
    display: "block",
    "&:first-child": { marginTop: 0 },
    marginBottom: "1em",
  },
});

export const DocMainHeading = styled("h1", {
  className: "heading",
  priority: 3,
  base: {
    textStyle: "headline.regular",
    margin: "0 0 0.5em",
    width: "fit-content",
    maxWidth: "100%",
    textWrap: "pretty",
  },
});
