import { frameworkLabel, type FrameworkId } from "@/lib/frameworks";
import { findDocGroup } from "../data/docs-groups";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbNav,
  BreadcrumbText,
} from "./breadcrumbs.css";

interface BreadcrumbsProps {
  framework: FrameworkId;
  slug: string;
  topic: string;
}

type Crumb =
  | { label: string; href: string }
  | { label: string; current?: boolean };

const isLink = (c: Crumb): c is { label: string; href: string } => "href" in c;

export const Breadcrumbs = ({ framework, slug, topic }: BreadcrumbsProps) => {
  const fwLabel = frameworkLabel(framework);
  const group = slug ? findDocGroup(slug) : undefined;
  const isIndex = slug === "";

  const crumbs: Crumb[] = [
    { label: "Docs", href: `/docs/${framework}/` },
    isIndex
      ? { label: fwLabel, current: true }
      : { label: fwLabel, href: `/${framework}/` },
  ];
  if (group) crumbs.push({ label: group.label });
  if (!isIndex) crumbs.push({ label: topic, current: true });

  return (
    <BreadcrumbNav aria-label="Breadcrumb">
      <BreadcrumbList>
        {crumbs.map((c, i) => (
          <BreadcrumbItem key={i}>
            {isLink(c) ? (
              <BreadcrumbLink href={c.href}>{c.label}</BreadcrumbLink>
            ) : (
              <BreadcrumbText aria-current={c.current ? "page" : undefined}>
                {c.label}
              </BreadcrumbText>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </BreadcrumbNav>
  );
};
