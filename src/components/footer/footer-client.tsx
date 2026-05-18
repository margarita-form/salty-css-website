"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useFramework } from "@/app/docs/components/framework-context";
import { isFrameworkId } from "@/lib/frameworks";

export const FooterClient = ({ children }: { children: ReactNode }) => {
  const { framework } = useFramework();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root
      .querySelectorAll<HTMLAnchorElement>('a[href^="/docs/"]')
      .forEach((link) => {
        const href = link.getAttribute("href") ?? "";
        const segments = href.split("/");
        if (isFrameworkId(segments[2] ?? "")) {
          segments[2] = framework;
        } else {
          segments.splice(2, 0, framework);
        }
        const rewritten = segments.join("/");
        if (rewritten !== href) link.setAttribute("href", rewritten);
      });
  }, [framework]);

  return (
    <div ref={ref} style={{ display: "contents" }}>
      {children}
    </div>
  );
};
