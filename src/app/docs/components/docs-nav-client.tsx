"use client";

import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";
import { DocsNavClientWrapper } from "./docs-nav.css";

interface DocsNavClientProps {
  children: React.ReactNode;
}

export const DocsNavClient = ({ children }: DocsNavClientProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!ref.current) return;
    const wrapper = ref.current;
    const links = wrapper.querySelectorAll<HTMLAnchorElement>("a[href]");
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      if (pathname.includes(href)) link.classList.add("active");
    });
  }, [pathname]);

  useEffect(() => {
    if (!ref.current) return;
    const wrapper = ref.current;

    const titleButtons = wrapper.querySelectorAll<HTMLButtonElement>(
      "[data-type='group-title']"
    );

    titleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const group = button.nextElementSibling;
        if (group) {
          group.classList.toggle("closed");
          button.classList.toggle("closed");
        }
      });
    });
  }, []);

  return <DocsNavClientWrapper ref={ref}>{children}</DocsNavClientWrapper>;
};
