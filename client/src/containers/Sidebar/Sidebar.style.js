import styled from 'styled-components';
import withTheme from '../../themes/withTheme';
import { headerHeight, sidebarWidth } from '../../themes/config';

export const Wrapper = withTheme(styled.div`
  position: fixed;
  z-index: 100;
  top: ${headerHeight};
  left: 0;
  display: block;
  width: ${sidebarWidth};
  height: calc(100vh - ${headerHeight});
  background: ${({ theme }) => theme.bg.sidebar};
  color: ${({ theme }) => theme.text.secondaryLight};
`);
