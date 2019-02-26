import styled from 'styled-components';
import withTheme from '../../themes/withTheme';
import { headerHeight, sidebarWidth, sidebarCollapsedWidth } from '../../themes/config';

export const Wrapper = withTheme(styled.header`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  width: 100vw;
  height: ${headerHeight};
  box-sizing: border-box;
  background: ${({ theme }) => theme.bg.header};
`);

export const LogoHolder = withTheme(styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${sidebarWidth};
  height: 100%;
  box-sizing: border-box;
  background: ${({ theme }) => theme.bg.logo};

  &.collapsed {
    width: ${sidebarCollapsedWidth};
  }
  &.normal {
    width: ${sidebarWidth};
  }
`);

export const HeaderHolder = withTheme(styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 32px;
  width: calc(100vw - ${sidebarWidth});
  height: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.border.main};

  &.expanded {
    width: calc(100vw - ${sidebarCollapsedWidth});
  }
  &.normal {
    width: calc(100vw - ${sidebarWidth});
  }
`);
