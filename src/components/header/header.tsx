import { Icon } from "../icon/icon.css";
import { SaltyCssLogo } from "../logos/salty-css-logo";
import { HeaderClient } from "./header-client";
import { DiscordIcon, GitHubIcon, NpmIcon, StarIcon } from "./header-icons";
import {
  Actions,
  Divider,
  HeaderAction,
  HeaderButton,
  HeaderLogo,
  HeaderWrapper,
  Links,
  MobileMenuButton,
  Navigation,
  NavigationListItem,
  NavLink,
} from "./header.css";

export const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderClient>
        <HeaderLogo title="Salty CSS" href="/">
          <SaltyCssLogo />
        </HeaderLogo>

        <Navigation>
          <Links>
            <NavLink href="/docs">Docs</NavLink>
            <NavLink href="/react">React</NavLink>
            <NavLink href="/next">Next.js</NavLink>
            <NavLink href="/astro">Astro</NavLink>
            <NavLink href="https://github.com/margarita-form/salty-css/releases">
              Releases
              <Icon css-src="url(/icons/ext-arrow.svg)" />
            </NavLink>
          </Links>

          <Divider />

          <MobileMenuButton aria-label="Toggle mobile menu" />

          <Actions>
            <NavigationListItem>
              <HeaderAction
                href="https://discord.gg/R6kr4KxMhP"
                title="Join Salty CSS Discord to get support"
              >
                <DiscordIcon />
              </HeaderAction>
            </NavigationListItem>

            <NavigationListItem>
              <HeaderAction
                href="https://www.npmjs.com/package/@salty-css/core"
                title="Install Salty CSS from NPM"
              >
                <NpmIcon />
              </HeaderAction>
            </NavigationListItem>

            <NavigationListItem>
              <HeaderAction
                href="https://github.com/margarita-form/salty-css"
                title="View Salty CSS on GitHub"
              >
                <GitHubIcon />
              </HeaderAction>
            </NavigationListItem>

            <NavigationListItem>
              <HeaderButton
                href="https://github.com/margarita-form/salty-css"
                title="Add a star on GitHub"
              >
                <StarIcon />
                <span className="text">Add a star</span>
              </HeaderButton>
            </NavigationListItem>
          </Actions>
        </Navigation>
      </HeaderClient>
    </HeaderWrapper>
  );
};
