import { styled } from "@salty-css/react/styled";

export const Icon = styled("span", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "var(--icon-size, 0.7em)",
    height: "var(--icon-size, 0.7em)",
    transition: "0.2s ease-out",
    transform: "var(--icon-transform, translateY(0.05em))",
    marginInline: "0.33em",
    background: "{theme.color}",
    mask: "{props.src} no-repeat center / contain",
  },
});
