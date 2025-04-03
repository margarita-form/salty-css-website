import { Outfit } from "next/font/google";
import localFont from "next/font/local";

const mainFont = Outfit({
  variable: "--font-family-main",
  subsets: ["latin"],
});

const logo = localFont({
  variable: "--font-family-logo",
  src: [
    {
      path: "./fonts/Redaction-Italic.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "/fonts/Redaction_35-Italic.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Redaction_50-Italic.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Redaction_70-Italic.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Redaction_100-Italic.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

const redaction = localFont({
  variable: "--font-family-redaction",
  src: [
    {
      path: "/fonts/Redaction-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Redaction-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Redaction-Bold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
});

export const fonts = [
  mainFont.variable,
  logo.variable,
  redaction.variable,
].join(" ");
