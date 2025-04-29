import { styled } from "@salty-css/react/styled";
import { rotateInfinite } from "../../styles/animations.css";

export const SaltyCssLogoSvg = styled("svg", {
  base: {
    width: "100%",
    height: "100%",
    fill: "currentColor",
    transform: "translateY(15%)",
  },
});

export const SaltyCssBallsSvg = styled("svg", {
  base: {
    width: "100%",
    height: "100%",
    fill: "currentColor",
    animation: rotateInfinite,
  },
});
