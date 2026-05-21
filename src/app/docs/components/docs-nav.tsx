import { FrameworkSwitcher } from "../../../components/framework-switcher/framework-switcher";
import { HeadingSmall } from "../../../components/heading.css";
import { Icon } from "../../../components/icon/icon.css";
import { DocsNavClient } from "./docs-nav-client";
import {
  DocsNavigationBackdrop,
  DocsNavigationCloseButton,
  DocsNavigationGroup,
  DocsNavigationGroupTitle,
  DocsNavigationItem,
  DocsNavigationItems,
  DocsNavigationItemWrapper,
  DocsNavigationWrapper,
  DocsNavMobileMenuHeader,
  DocsNavMobileMenuButtonIcon,
  DocsNavMobileMenuButton,
  DocsNavMobileMenuButtonCurrent,
} from "./docs-nav.css";
import { SearchButton } from "./search/search-button";
import { SearchButtonWrapper } from "./search/search-button.css";

interface DocsNavProps {
  framework: string;
}

export const DocsNavigation = ({ framework }: DocsNavProps) => {
  const prefix = `/docs/${framework}`;
  return (
    <DocsNavClient>
      <DocsNavMobileMenuHeader>
        <DocsNavMobileMenuButton id="docs-nav-mobile-menu-button">
          <DocsNavMobileMenuButtonIcon css-src="url(/icons/chevron-right.svg)" />
          Menu
        </DocsNavMobileMenuButton>

        <DocsNavMobileMenuButtonCurrent id="docs-nav-mobile-menu-button-current" />
      </DocsNavMobileMenuHeader>

      <DocsNavigationBackdrop id="docs-nav-backdrop" />

      <DocsNavigationWrapper id="docs-nav">
        <HeadingSmall element="h2">Documentation</HeadingSmall>

        <FrameworkSwitcher />

        <SearchButtonWrapper>
          <SearchButton />
        </SearchButtonWrapper>

        <DocsNavigationCloseButton
          id="docs-nav-close-button"
          aria-label="Close menu"
        >
          <Icon css-src="url(/icons/close-x.svg)" />
        </DocsNavigationCloseButton>

        <DocsNavigationGroup>
          <DocsNavigationGroupTitle>
            Getting Started
            <Icon css-src="url(/icons/chevron-down.svg)" />
          </DocsNavigationGroupTitle>

          <DocsNavigationItems>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/quick-start`}>
                Quick Start
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/installation`}>
                Installation
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/usage`}>
                Usage
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/troubleshooting`}>
                Troubleshooting
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/cli`}>
                CLI
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/faq`}>
                FAQ
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
          </DocsNavigationItems>
        </DocsNavigationGroup>

        <DocsNavigationGroup>
          <DocsNavigationGroupTitle>
            Styling
            <Icon css-src="url(/icons/chevron-down.svg)" />
          </DocsNavigationGroupTitle>
          <DocsNavigationItems>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/basics`}>
                Component styles
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/variables`}>
                Variables
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/theming`}>
                Theming
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/fonts`}>
                Fonts
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/imports`}>
                Imports
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/classnames`}>
                Class styles
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/variants`}>
                Variants
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/overrides`}>
                Overrides
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/media-queries`}>
                Media Queries
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/animations`}>
                Animations
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/templates`}>
                Templates
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
          </DocsNavigationItems>
        </DocsNavigationGroup>

        <DocsNavigationGroup>
          <DocsNavigationGroupTitle>
            Utilities
            <Icon css-src="url(/icons/chevron-down.svg)" />
          </DocsNavigationGroupTitle>
          <DocsNavigationItems>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/viewport-clamp`}>
                Viewport Clamp
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/color-function`}>
                Color Function
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/modifiers`}>
                Modifiers
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
          </DocsNavigationItems>
        </DocsNavigationGroup>

        <DocsNavigationGroup>
          <DocsNavigationGroupTitle className="closed">
            API
            <Icon css-src="url(/icons/chevron-down.svg)" />
          </DocsNavigationGroupTitle>
          <DocsNavigationItems className="closed">
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/api/styled`}>
                Styled Function
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/api/classname`}>
                Class Name Function
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/api/config`}>
                defineConfig
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href={`${prefix}/api/define-factories`}>
                define* factories
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
          </DocsNavigationItems>
        </DocsNavigationGroup>
      </DocsNavigationWrapper>
    </DocsNavClient>
  );
};
