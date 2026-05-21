"use client";

import Link from "next/link";
import { AllHTMLAttributes, createElement, useCallback } from "react";
import { useFramework } from "../../app/docs/components/framework-context";

interface DynamicLinkProps extends AllHTMLAttributes<HTMLElement> {
  href?: string;
  children: React.ReactNode;
  className?: string;
  element?: string;
}

export const DynamicLink = ({
  href,
  children,
  className,
  element,
  ...rest
}: DynamicLinkProps) => {
  const { framework, setFramework } = useFramework();

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const href = e.currentTarget.getAttribute("href");

      const regex = /docs\/(react|next|astro)\//;
      if (href && regex.test(href)) {
        const match = href.match(regex);
        if (match && match[1] && match[1] !== framework) {
          setFramework(match[1] as "react" | "next" | "astro");
        }
      }
    },
    [framework, setFramework],
  );

  if (!href)
    return createElement(element || "span", { className, ...rest }, children);

  const target =
    href.startsWith("http") || /.+\.\w+$/.test(href) ? "_blank" : undefined;
  return (
    <Link
      href={href}
      target={target}
      className={className}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Link>
  );
};
