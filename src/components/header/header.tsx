import { SaltyCssLogo } from "../logos/salty-css-logo";
import { DiscordIcon, GitHubIcon, NpmIcon } from "./header-icons";
import {
  Actions,
  HeaderAction,
  HeaderLogo,
  HeaderWrapper,
  Navigation,
  NavigationListItem,
} from "./header.css";

export const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderLogo>
        <SaltyCssLogo />
      </HeaderLogo>

      <Navigation>
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
        </Actions>
      </Navigation>
    </HeaderWrapper>
  );
};
