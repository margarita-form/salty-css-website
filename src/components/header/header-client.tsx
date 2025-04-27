"use client";
import { useEffect, useRef } from "react";
import { HeaderClientWrapper } from "./header.css";
import { usePathname } from "next/navigation";
import { lockScroll, unlockScroll } from "../../lib/scroll-lock";

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

    const handleClick = () => {
      mobileMenuButton.classList.toggle("open");
      const isMenuOpen = mainLinks.classList.toggle("open");

      // Toggle scroll lock
      if (isMenuOpen) lockScroll();
      else unlockScroll();
    };
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
