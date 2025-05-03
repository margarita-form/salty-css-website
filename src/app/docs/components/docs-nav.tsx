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

export const DocsNavigation = () => {
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
              <DocsNavigationItem href="/docs/quick-start">
                Quick Start
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href="/docs/installation">
                Installation
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href="/docs/usage">Usage</DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href="/docs/cli">CLI</DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href="/docs/faq">FAQ</DocsNavigationItem>
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
              <DocsNavigationItem href="/docs/basics">
                Component styles
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href="/docs/classnames">
                Class styles
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href="/docs/variants">
                Variants
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href="/docs/overrides">
                Overrides
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href="/docs/media-queries">
                Media Queries
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href="/docs/animations">
                Animations
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href="/docs/templates">
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
              <DocsNavigationItem href="/docs/viewport-clamp">
                Viewport Clamp
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href="/docs/color-function">
                Color Function
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
              <DocsNavigationItem href="/docs/api/styled">
                Styled Function
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href="/docs/api/classname">
                Class Name Function
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
          </DocsNavigationItems>
        </DocsNavigationGroup>
      </DocsNavigationWrapper>
    </DocsNavClient>
  );
};
