import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';

import withTheme from '../../themes/withTheme';
import {
  headerHeight,
  footerHeight,
  sidebarWidth,
  sidebarCollapsedWidth,
  sidebarTransition,
} from '../../themes/config';

export const SegmentGroup = styled(Segment.Group)`
  &.ui.horizontal.segments {
    margin: 0;
    border: none;
    padding-top: ${headerHeight};
  }
`;

export const Content = withTheme(styled.div`
  width: calc(100vw - ${sidebarWidth});
  margin-left: ${sidebarWidth};
  min-height: calc(100vh - ${headerHeight});
  color: ${({ theme }) => theme.text.mainDark};
  transition: ${sidebarTransition};

  &.expanded {
    width: calc(100vw - ${sidebarCollapsedWidth});
    margin-left: ${sidebarCollapsedWidth};
  }
  &.normal {
    width: calc(100vw - ${sidebarWidth});
    margin-left: ${sidebarWidth};
  }
`);

export const ContentContainer = withTheme(styled.div`
  width: 100%;
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  color: ${({ theme }) => theme.text.mainDark};
`);
