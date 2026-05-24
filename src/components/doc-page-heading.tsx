import { DocHeadingGroup, DocMainHeading } from "./doc-page-heading.css";

interface DocPageHeadingProps {
  preHeadline: string;
  visibleHeading: string;
}

export const DocPageHeading = ({ visibleHeading }: DocPageHeadingProps) => (
  <DocHeadingGroup>
    <DocMainHeading>{visibleHeading}</DocMainHeading>
  </DocHeadingGroup>
);
