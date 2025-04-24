import { styled } from "@salty-css/react/styled";
import { Icon } from "../../../../components/icon/icon.css";

export const SearchButtonWrapper = styled("div", {
  base: {
    borderTop: "1px solid {theme.altBackground}",
    padding: "{spacing.medium} 0 0",
  },
});

export const SearchButtonContainer = styled("button", {
  base: {
    textStyle: "body.small",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "0",
    backgroundColor: "transparent",
    border: "none",
    color: "{theme.altColor}",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "left",
    "&:hover": {
      opacity: 0.7,
    },
  },
});

export const SearchIcon = styled(Icon, {
  base: {
    "--icon-size": "1em",
    "--icon-transform": "translateY(0.15em)",
    display: "inline-block",
    marginRight: "0.5em",
  },
});

export const ShortcutContainer = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "0.5em",
  },
});
