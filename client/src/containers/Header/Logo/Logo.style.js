import styled from 'styled-components';
import withTheme from '../../../themes/withTheme';

export const Wrapper = withTheme(styled.div`
  font-size: 3rem;
  font-family: serif;
  font-weight: bold;
  color: ${({ theme }) => theme.text.mainLight};
  box-sizing: border-box;
`);
