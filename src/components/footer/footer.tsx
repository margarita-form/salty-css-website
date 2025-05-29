import { DynamicLink } from "../dynamic-link/dynamic-link";
import { SaltyCssLogo } from "../logos/salty-css-logo";
import {
  FooterContainer,
  FooterDivider,
  FooterLink,
  FooterLinkGroups,
  FooterLinksColumn,
  FooterLinksTitle,
  FooterLogo,
  FooterMention,
  FooterMentions,
  FooterWrapper,
} from "./footer.css";

export const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterLinkGroups>
          <FooterLinksColumn>
            <FooterLinksTitle>Frameworks</FooterLinksTitle>
            <FooterLink href="/next">Next.js</FooterLink>
            <FooterLink href="/astro">Astro.js</FooterLink>
            <FooterLink href="/react">React</FooterLink>
          </FooterLinksColumn>

          <FooterLinksColumn>
            <FooterLinksTitle>Documentation</FooterLinksTitle>
            <FooterLink href="/docs/quick-start">Get Started</FooterLink>
            <FooterLink href="/docs/installation">Installation</FooterLink>
            <FooterLink href="/docs/usage">Usage</FooterLink>
            <FooterLink href="/docs/faq">FAQ</FooterLink>
          </FooterLinksColumn>
          <FooterLinksColumn>
            <FooterLinksTitle>Interwebs</FooterLinksTitle>
            <FooterLink href="https://discord.gg/R6kr4KxMhP>">
              Discord
            </FooterLink>
            <FooterLink href="https://github.com/margarita-form/salty-css">
              GitHub
            </FooterLink>
            <FooterLink href="https://www.npmjs.com/package/@salty-css/core">
              NPM
            </FooterLink>
          </FooterLinksColumn>
        </FooterLinkGroups>

        <FooterLogo title="Salty CSS" href="/">
          <SaltyCssLogo />
        </FooterLogo>

        <FooterDivider variant="pixelated" />

        <FooterMentions>
          <FooterMention>
            Created by{" "}
            <DynamicLink href="https://github.com/tremppu">
              Teemu Lahjalahti
            </DynamicLink>
          </FooterMention>

          <FooterMention>© 2025 Salty CSS</FooterMention>
        </FooterMentions>
      </FooterContainer>
    </FooterWrapper>
  );
};
