import { styled } from "@salty-css/react/styled";

export const Icon = styled("span", {
  base: {
    "--test": "{props.src}",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "var(--icon-size, 0.7em)",
    height: "var(--icon-size, 0.7em)",
    transform: "translateY(0.05em)",
    marginInline: "0.33em",
    background: "{theme.color}",
    mask: "url(/icons/ext-arrow.svg) no-repeat center / contain",
  },
});
