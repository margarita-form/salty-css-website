import { HeroBlockContainer, HeroBlockWrapper } from "./hero-block.css";

interface HeroBlockProps {
  children?: React.ReactNode;
}

export const HeroBlock = ({ children }: HeroBlockProps) => {
  return (
    <HeroBlockWrapper>
      <HeroBlockContainer>{children}</HeroBlockContainer>
    </HeroBlockWrapper>
  );
};
