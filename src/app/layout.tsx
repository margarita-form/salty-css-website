import "../styles/index.css";
import { fonts } from "../styles/fonts";
import { Header } from "../components/header/header";
import { WarningBox } from "../components/main.css";
import { Footer } from "../components/footer/footer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fonts}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className="theme-dark theme-current">
        <WarningBox data-nosnippet>
          Website is still under construction.
        </WarningBox>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
