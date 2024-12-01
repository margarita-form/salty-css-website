import { GitHubIcon, ReactIcon } from "./header-icons";
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
      <HeaderLogo>Salty CSS</HeaderLogo>

      <Navigation>
        <Actions>
          <NavigationListItem>
            <HeaderAction href="https://www.npmjs.com/package/@salty-css/react">
              <ReactIcon />
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
