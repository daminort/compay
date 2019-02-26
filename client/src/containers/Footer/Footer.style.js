import styled from 'styled-components';
import withTheme from '../../themes/withTheme';

export const Wrapper = withTheme(styled.footer`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 60px;
  padding-left: 20px;
  border-top: 1px solid ${({ theme }) => theme.border.main};
`);
