"use client";
import { useEffect, useRef } from "react";
import { HeaderClientWrapper } from "./header.css";
import { usePathname } from "next/navigation";

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

    // Store original body style
    const originalStyle = window.getComputedStyle(document.body);
    const originalOverflow = originalStyle.overflow;

    const handleClick = () => {
      mobileMenuButton.classList.toggle("open");
      const isMenuOpen = mainLinks.classList.toggle("open");

      // Toggle scroll lock
      if (isMenuOpen) {
        // Save current scroll position
        const scrollY = window.scrollY;

        // Apply scroll lock
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";
        document.body.style.overflowY = "scroll";
      } else {
        // Remove scroll lock
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = originalOverflow;

        // Restore scroll position
        const scrollY = parseInt(document.body.style.top || "0", 10) * -1;
        window.scrollTo(0, scrollY);
      }
    };
    mobileMenuButton.addEventListener("click", handleClick);

    // Cleanup function
    return () => {
      mobileMenuButton.removeEventListener("click", handleClick);
      // Ensure scroll is restored if component unmounts while menu is open
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return <HeaderClientWrapper ref={ref}>{children}</HeaderClientWrapper>;
};
