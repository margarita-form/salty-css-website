import { SaltyCssLogo } from "../logos/salty-css-logo";
import { GitHubIcon, NpmIcon } from "./header-icons";
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
            <HeaderAction href="https://www.npmjs.com/package/@salty-css/core">
              <NpmIcon />
            </HeaderAction>
          </NavigationListItem>

          <NavigationListItem>
            <HeaderAction href="https://github.com/margarita-form/salty-css">
              <GitHubIcon />
            </HeaderAction>
          </NavigationListItem>
        </Actions>
      </Navigation>
    </HeaderWrapper>
  );
};
