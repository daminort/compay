import styled from 'styled-components';
import withTheme from '../../../themes/withTheme';

export const Segment = withTheme(styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem 1rem;
  font-size: 1.1rem;
  border-bottom: 1px solid ${({ theme }) => theme.bg.sidebarHover};
  height: auto;
  cursor: pointer;

  i.icon {
    font-size: 2.2rem;
    margin: 0 1.5rem 0 1rem;
    height: auto;
  }

  &:hover {
    background-color: ${({ theme }) => theme.bg.sidebarHover};
    color: ${({ theme }) => theme.text.mainLight};
  }

  &.active {
    background-color: ${({ theme }) => theme.bg.sidebarActive};
    color: ${({ theme }) => theme.text.mainLight};
    font-weight: bold;
  }
  &.collapsed {
    padding: 1.5rem 10px;
    i.icon {
      margin: 0px;
    }
  }
`);
