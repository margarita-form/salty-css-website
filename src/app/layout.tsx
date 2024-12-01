import "../styles/index.css";
import type { Metadata } from "next";
import { fonts } from "../styles/fonts";
import { Header } from "../components/header/header";

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
      <body className="theme-dark theme-current">
        <Header />
        {children}
      </body>
    </html>
  );
}
