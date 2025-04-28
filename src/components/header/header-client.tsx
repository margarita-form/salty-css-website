"use client";
import { useEffect, useRef } from "react";
import { HeaderClientWrapper } from "./header.css";
import { usePathname } from "next/navigation";
import { lockScroll, unlockScroll } from "../../lib/scroll-lock";
import { closeMainNav } from "./header-helpers";

interface HeaderClientProps {
  children: React.ReactNode;
}

export const HeaderClient = ({ children }: HeaderClientProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!ref.current) return;
    const wrapper = ref.current;
    const links = wrapper.querySelectorAll<HTMLAnchorElement>("a[href]");
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      if (pathname.startsWith(href)) link.classList.add("active");
      else link.classList.remove("active");
    });

    // Close main nav on route change
    closeMainNav();
  }, [pathname]);

  useEffect(() => {
    if (!ref.current) return;
    const wrapper = ref.current;
    const mobileMenuButton = wrapper.querySelector<HTMLButtonElement>(
      "#mobile-menu-button"
    );
    if (!mobileMenuButton) throw new Error("Mobile menu button not found");
    const mainLinks = wrapper.querySelector<HTMLElement>("#main-links");
    if (!mainLinks) throw new Error("Main links not found");

    const updateMobileNavState = (isOpen?: boolean) => {
      const isMenuOpen = mainLinks.classList.toggle("open", isOpen);
      mobileMenuButton.classList.toggle("open", isMenuOpen);

      // Toggle scroll lock
      if (isMenuOpen) lockScroll();
      else unlockScroll();
    };

    document.addEventListener("closeMainNav", () =>
      updateMobileNavState(false)
    );

    const handleClick = () => updateMobileNavState();

    mobileMenuButton.addEventListener("click", handleClick);

    // Cleanup function
    return () => {
      mobileMenuButton.removeEventListener("click", handleClick);
      // Remove scroll lock
      unlockScroll(false);
    };
  }, []);

  return <HeaderClientWrapper ref={ref}>{children}</HeaderClientWrapper>;
};
