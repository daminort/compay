import styled from 'styled-components';
import withTheme from '../../../themes/withTheme';

export const Wrapper = withTheme(styled.div`
  font-size: 3rem;
  font-family: serif;
  font-weight: bold;
  color: ${({ theme }) => theme.text.mainLight};
  box-sizing: border-box;
  cursor: pointer;

  i.icon {
    font-size: 2.2rem;
    margin: 0 1rem 0 1rem;
    height: auto;
  }
`);
