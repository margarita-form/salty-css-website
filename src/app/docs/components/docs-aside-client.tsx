"use client";

import { useRef, useEffect, useState } from "react";
import {
  DocsAsideLink,
  DocsAsideLinks,
  DocsAsideLinkWrapper,
  DocsAsideWrapper,
} from "./docs-aside.css";

interface DocsAsideClientProps {
  children: React.ReactNode;
}

export const DocsAsideClient = ({ children }: DocsAsideClientProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [anchors, setAnchors] = useState<HTMLElement[]>([]);

  useEffect(() => {
    if (!ref.current) return;
    const wrapper = ref.current;
    const previousElement = wrapper.previousElementSibling;
    if (!previousElement) return;

    const anchors = previousElement.querySelectorAll<HTMLElement>("[id]");
    const anchorsArray = Array.from(anchors);
    setAnchors(anchorsArray);
  }, []);

  return (
    <DocsAsideWrapper ref={ref}>
      {children}
      <DocsAsideLinks>
        {anchors.length > 0 &&
          anchors.map((anchor) => {
            return (
              <DocsAsideLinkWrapper key={anchor.id}>
                <DocsAsideLink href={`#${anchor.id}`} className="anchor">
                  {anchor.innerText}
                </DocsAsideLink>
              </DocsAsideLinkWrapper>
            );
          })}
      </DocsAsideLinks>
    </DocsAsideWrapper>
  );
};
