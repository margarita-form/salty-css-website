"use client";

import { useRef, useEffect, useState } from "react";
import {
  DocsAsideLink,
  DocsAsideLinks,
  DocsAsideLinkWrapper,
  DocsAsideWrapper,
} from "./docs-aside.css";
import { usePathname } from "next/navigation";

interface DocsAsideClientProps {
  children: React.ReactNode;
}

export const DocsAsideClient = ({ children }: DocsAsideClientProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [anchors, setAnchors] = useState<HTMLElement[]>([]);

  useEffect(() => {
    if (!ref.current) return;
    const wrapper = ref.current;
    const previousElement = wrapper.previousElementSibling;
    if (!previousElement) return;

    const anchors = previousElement.querySelectorAll<HTMLElement>("[id]");
    const anchorsArray = Array.from(anchors);
    setAnchors(anchorsArray);

    // Highlight the first anchor that is in the viewport
    const handleScroll = () => {
      let found = false;
      for (const anchor of anchorsArray) {
        const linkElement = wrapper.querySelector(`a[href="#${anchor.id}"]`);
        if (!linkElement) continue;
        if (found) {
          linkElement.classList.remove("active");
          continue;
        }
        const rect = anchor.getBoundingClientRect();
        if (rect.top < 0) {
          linkElement.classList.remove("active");
          continue;
        }

        linkElement.classList.add("active");
        found = true;
      }
    };

    const timeout = setTimeout(() => handleScroll(), 10);
    document.addEventListener("scroll", handleScroll);

    return () => {
      if (timeout) clearTimeout(timeout);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <DocsAsideWrapper ref={ref}>
      {children}
      <DocsAsideLinks>
        {anchors.length > 0 &&
          anchors.map((anchor, index) => {
            if (anchor.nodeName === "H1") return null;
            return (
              <DocsAsideLinkWrapper key={anchor.id + index}>
                <DocsAsideLink
                  href={`#${anchor.id}`}
                  className={`anchor level-${anchor.nodeName}`}
                >
                  {anchor.innerText}
                </DocsAsideLink>
              </DocsAsideLinkWrapper>
            );
          })}
      </DocsAsideLinks>
    </DocsAsideWrapper>
  );
};
