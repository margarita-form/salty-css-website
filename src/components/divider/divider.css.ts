import { styled } from "@salty-css/react/styled";
import { HDClamp } from "../../styles/helpers.css";

export const Divider = styled("div", {
  base: {
    position: "relative",
    margin: "auto",
  },
  variants: {
    width: {
      full: {
        width: "100%",
      },
      half: {
        width: "50%",
      },
      quarter: {
        width: "25%",
      },
      small: {
        width: "{width.cols.3}",
      },
      medium: {
        width: "{width.cols.6}",
      },
      large: {
        width: "{width.cols.9}",
      },
    },
    variant: {
      simple: {
        height: HDClamp(1),
        background: "{theme.altBackground}",
      },
      rgb: {
        height: HDClamp(6),
        background:
          "linear-gradient(90deg, #FF3E9A, #0088FF, #FFD732, #0088FF, #FF3E9A)",
        backgroundSize: "200% 100%",
        animation: "shimmer 8s linear infinite",
        opacity: 0.8,
        "@keyframes shimmer": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "200% 0%" },
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: "100%",
          background: "rgba(255, 255, 255, 0.3)",
          filter: "blur(6px)",
        },
      },
      saas: {
        height: HDClamp(1),
        background: "{theme.altBackground}",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "0%",
          width: "42%",
          height: "100%",
          background: "linear-gradient(90deg, #0088FF, #FF3E9A)",
          borderRadius: "2px",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          right: "0%",
          width: "10%",
          height: "100%",
          background: "#FFD732",
          borderRadius: "2px",
        },
      },
      retro: {
        height: HDClamp(12),
        background:
          "repeating-linear-gradient(90deg, #FF3E9A, #FF3E9A 5px, transparent 5px, transparent 10px, #0088FF 10px, #0088FF 15px, transparent 15px, transparent 20px, #FFD732 20px, #FFD732 25px, transparent 25px, transparent 30px)",
        opacity: 0.7,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, {theme.background}, transparent 5%, transparent 95%, {theme.background})",
          zIndex: 1,
        },
      },
      neon: {
        height: HDClamp(3),
        background: "#0088FF",
        boxShadow: "0 0 10px #0088FF, 0 0 20px #0088FF, 0 0 30px #0088FF",
        borderRadius: HDClamp(3),
        opacity: 0.8,
        "&::before": {
          content: '""',
          position: "absolute",
          top: -HDClamp(1),
          left: "25%",
          width: "50%",
          height: HDClamp(5),
          background: "rgba(0, 136, 255, 0.4)",
          filter: "blur(8px)",
          borderRadius: HDClamp(5),
        },
      },
      pixelated: {
        height: HDClamp(16),
        background: "transparent",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "25%",
          left: 0,
          right: 0,
          height: "50%",
          backgroundImage: `
            linear-gradient(90deg, transparent 0%, transparent 30%, #0088FF 30%, #0088FF 32%, transparent 32%, transparent 54%, 
            #FF3E9A 54%, #FF3E9A 56%, transparent 56%, transparent 78%, #FFD732 78%, #FFD732 80%, transparent 80%, transparent 100%)
          `,
          backgroundSize: HDClamp(20) + " 100%",
          backgroundRepeat: "repeat-x",
          clipPath:
            "polygon(0 0, 100% 0, 95% 25%, 85% 50%, 95% 75%, 100% 100%, 0 100%, 5% 75%, 15% 50%, 5% 25%)",
        },
      },
    },
  },
  defaultVariants: {
    variant: "rgb",
    width: "full",
  },
});
