import { HeadingSmall } from "../../../components/heading.css";
import { Icon } from "../../../components/icon/icon.css";
import { DocsNavClient } from "./docs-nav-client";
import {
  DocsNavigationGroup,
  DocsNavigationGroupTitle,
  DocsNavigationItem,
  DocsNavigationItems,
  DocsNavigationItemWrapper,
  DocsNavigationWrapper,
} from "./docs-nav.css";

export const DocsNavigation = () => {
  return (
    <DocsNavClient>
      <DocsNavigationWrapper>
        <HeadingSmall element="h2">Documentation</HeadingSmall>

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
              <DocsNavigationItem href="/docs/animations">
                Animations
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
          </DocsNavigationItems>
        </DocsNavigationGroup>

        <DocsNavigationGroup>
          <DocsNavigationGroupTitle>
            CLI
            <Icon css-src="url(/icons/chevron-down.svg)" />
          </DocsNavigationGroupTitle>
          <DocsNavigationItems>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href="/docs/cli-intialize">
                Intialize
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href="/docs/cli-build">
                Build
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href="/docs/cli-generate">
                Generate
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
            <DocsNavigationItemWrapper>
              <DocsNavigationItem href="/docs/cli-update">
                Update
              </DocsNavigationItem>
            </DocsNavigationItemWrapper>
          </DocsNavigationItems>
        </DocsNavigationGroup>
      </DocsNavigationWrapper>
    </DocsNavClient>
  );
};
