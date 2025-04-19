import { DocsAside } from "./components/docs-aside";
import { DocsNavigation } from "./components/docs-nav";
import { DocsLayoutWrapper } from "./docs-layout.css";

export default function DocsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <DocsLayoutWrapper>
      <DocsNavigation />
      <article>{children}</article>
      <DocsAside />
    </DocsLayoutWrapper>
  );
}
