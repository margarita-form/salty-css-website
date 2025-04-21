import { styled } from "@salty-css/react/styled";
import { HDClamp } from "../../../styles/helpers.css";

export const DocPageWrapper = styled("div", {
  base: {
    padding: "0 {spacing.large} {spacing.large}",
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.medium}",
    lineHeight: "1.5em",
    fontStyle: "initial",
    maxWidth: HDClamp(960),
    "@largeMobileDown": {
      padding: 0,
    },
  },
});
