import "../styles/index.css";
import { fonts } from "../styles/fonts";
import { Header } from "../components/header/header";
import { PostHogProvider } from "../components/PostHogProvider";
import { WarningBox } from "../components/main.css";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fonts}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className="theme-dark theme-current">
        <PostHogProvider>
          <WarningBox data-nosnippet>Website is under construction.</WarningBox>
          <Header />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
