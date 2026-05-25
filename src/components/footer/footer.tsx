import { DynamicLink } from "../dynamic-link/dynamic-link";
import { SaltyCssLogo } from "../logos/salty-css-logo";
import { FooterClient } from "./footer-client";
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
  const year = new Date().getFullYear();
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

          <FooterClient>
            <FooterLinksColumn>
              <FooterLinksTitle>Documentation</FooterLinksTitle>
              <FooterLink href="/docs/react/quick-start">
                Get Started
              </FooterLink>
              <FooterLink href="/docs/react/installation">
                Installation
              </FooterLink>
              <FooterLink href="/docs/react/usage">Usage</FooterLink>
              <FooterLink href="/docs/react/faq">FAQ</FooterLink>
            </FooterLinksColumn>
          </FooterClient>
          <FooterLinksColumn>
            <FooterLinksTitle>Technical jargon</FooterLinksTitle>
            <FooterLink href="/sitemap.xml">sitemap.xml</FooterLink>
            <FooterLink href="/llms.txt">llms.txt</FooterLink>
            <FooterLink href="/llms-full.txt">llms-full.txt</FooterLink>
          </FooterLinksColumn>
          <FooterLinksColumn>
            <FooterLinksTitle>Interwebs</FooterLinksTitle>
            <FooterLink href="https://discord.gg/R6kr4KxMhP">
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

          <FooterMention>© {year} Salty CSS</FooterMention>
        </FooterMentions>
      </FooterContainer>
    </FooterWrapper>
  );
};
