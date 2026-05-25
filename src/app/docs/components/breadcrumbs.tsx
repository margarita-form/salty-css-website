import { frameworkLabel, type FrameworkId } from "@/lib/frameworks";
import { findDocGroup, findDocGroupById } from "../data/docs-groups";
import { isCategoryIndexSlug } from "../data/docs-order";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbNav,
  BreadcrumbText,
  DocPreheading,
} from "./breadcrumbs.css";

interface BreadcrumbsProps {
  framework: FrameworkId;
  slug: string;
  topic: string;
  preHeadline: string;
}

type Crumb =
  | { label: string; href: string }
  | { label: string; current?: boolean };

const isLink = (c: Crumb): c is { label: string; href: string } => "href" in c;

export const Breadcrumbs = ({
  framework,
  slug,
  topic,
  preHeadline,
}: BreadcrumbsProps) => {
  const fwLabel = frameworkLabel(framework);
  const isIndex = slug === "";
  const isCategoryIndex = isCategoryIndexSlug(slug);
  const group = slug
    ? isCategoryIndex
      ? findDocGroupById(slug)
      : findDocGroup(slug)
    : undefined;

  const crumbs: Crumb[] = [
    { label: "Docs", href: `/docs/${framework}/` },
    isIndex
      ? { label: fwLabel, current: true }
      : { label: fwLabel, href: `/${framework}/` },
  ];
  if (group) {
    if (isCategoryIndex) {
      crumbs.push({ label: group.label, current: true });
    } else {
      crumbs.push({
        label: group.label,
        href: `/docs/${framework}/${group.id}/`,
      });
    }
  }
  if (!isIndex && !isCategoryIndex) {
    crumbs.push({ label: topic, current: true });
  }

  return (
    <>
      <BreadcrumbNav aria-label="Breadcrumb">
        <BreadcrumbList>
          {crumbs.map((c, i) => {
            return (
              <BreadcrumbItem key={i}>
                {isLink(c) ? (
                  <BreadcrumbLink href={c.href}>{c.label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbText aria-current={c.current ? "page" : undefined}>
                    {c.label}
                  </BreadcrumbText>
                )}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </BreadcrumbNav>
      {<DocPreheading>{preHeadline}</DocPreheading>}
    </>
  );
};
