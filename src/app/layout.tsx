import "../styles/index.css";
import type { Metadata } from "next";
import { fonts } from "../styles/fonts";

export const metadata: Metadata = {
  title: "Salty CSS",
  description:
    "CSS-in-JS library for React, Next.js, Server Components and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts}>
      <body className="theme-dark theme-current">{children}</body>
    </html>
  );
}
