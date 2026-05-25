import { type FrameworkId } from "@/lib/frameworks";
import { findDocGroupById } from "../data/docs-groups";
import { getDocSummary } from "../data/doc-titles";
import {
  CategoryIndexLink,
  CategoryIndexLinkDescription,
  CategoryIndexLinkTitle,
  CategoryIndexListEyebrow,
  CategoryIndexListItem,
  CategoryIndexListItems,
  CategoryIndexListSection,
} from "./category-index-list.css";

interface CategoryIndexListProps {
  framework: FrameworkId;
  groupId: string;
}

export const CategoryIndexList = async ({
  framework,
  groupId,
}: CategoryIndexListProps) => {
  const group = findDocGroupById(groupId);
  if (!group) return null;

  const summaries = await Promise.all(
    group.slugs.map((slug) => getDocSummary(slug, framework)),
  );

  const items = summaries.filter(
    (s): s is NonNullable<typeof s> => s !== null,
  );

  if (items.length === 0) return null;

  return (
    <CategoryIndexListSection aria-label={`${group.label} pages`}>
      <CategoryIndexListEyebrow>In this section</CategoryIndexListEyebrow>
      <CategoryIndexListItems>
        {items.map((item) => (
          <CategoryIndexListItem key={item.slug}>
            <CategoryIndexLink href={item.href}>
              <CategoryIndexLinkTitle>{item.label}</CategoryIndexLinkTitle>
              {item.description && (
                <CategoryIndexLinkDescription>
                  {item.description}
                </CategoryIndexLinkDescription>
              )}
            </CategoryIndexLink>
          </CategoryIndexListItem>
        ))}
      </CategoryIndexListItems>
    </CategoryIndexListSection>
  );
};
