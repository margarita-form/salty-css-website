import Link from "next/link";
import { AllHTMLAttributes, createElement } from "react";

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
  if (!href)
    return createElement(element || "span", { className, ...rest }, children);

  const target = href.startsWith("http") ? "_blank" : undefined;
  return (
    <Link href={href} target={target} className={className} prefetch {...rest}>
      {children}
    </Link>
  );
};
