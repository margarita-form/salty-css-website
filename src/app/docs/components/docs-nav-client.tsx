"use client";

import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";
import { DocsNavClientWrapper } from "./docs-nav.css";
import { lockScroll, unlockScroll } from "../../../lib/scroll-lock";
import { closeDocsNav } from "./docs-nav-helpers";

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
      if (pathname.includes(href)) {
        link.classList.add("active");

        const currentPageElement = wrapper.querySelector<HTMLButtonElement>(
          "#docs-nav-mobile-menu-button-current"
        );

        if (currentPageElement) {
          currentPageElement.innerText = link.innerText;
          currentPageElement.setAttribute("aria-label", link.innerText);
        }
      } else link.classList.remove("active");
    });

    // Close docs nav on route change
    closeDocsNav();
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

  useEffect(() => {
    if (!ref.current) return;
    const wrapper = ref.current;
    const mobileMenuButton = wrapper.querySelector<HTMLButtonElement>(
      "#docs-nav-mobile-menu-button"
    );
    if (!mobileMenuButton) throw new Error("Mobile menu button not found");
    const docsNav = wrapper.querySelector<HTMLElement>("#docs-nav");
    if (!docsNav) throw new Error("Docs nav not found");
    const backdrop = wrapper.querySelector<HTMLElement>("#docs-nav-backdrop");
    if (!backdrop) throw new Error("Docs nav backdrop not found");
    const closeButton = wrapper.querySelector<HTMLButtonElement>(
      "#docs-nav-close-button"
    );
    if (!closeButton) throw new Error("Close button not found");

    const updateMobileNavState = (isOpen?: boolean) => {
      const isMenuOpen = mobileMenuButton.classList.toggle("open", isOpen);
      docsNav.classList.toggle("open", isMenuOpen);
      backdrop.classList.toggle("open", isMenuOpen);

      // Toggle scroll lock
      if (isMenuOpen) lockScroll();
      else unlockScroll();
    };

    document.addEventListener("closeDocsNav", () =>
      updateMobileNavState(false)
    );

    const handleClick = () => updateMobileNavState();

    mobileMenuButton.addEventListener("click", handleClick);
    backdrop.addEventListener("click", handleClick);
    closeButton.addEventListener("click", handleClick);

    // Cleanup function
    return () => {
      mobileMenuButton.removeEventListener("click", handleClick);
      backdrop.removeEventListener("click", handleClick);
      closeButton.removeEventListener("click", handleClick);
    };
  }, []);

  return <DocsNavClientWrapper ref={ref}>{children}</DocsNavClientWrapper>;
};
