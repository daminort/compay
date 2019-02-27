import styled from 'styled-components';
import withTheme from '../../../themes/withTheme';

export const Button = withTheme(styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  min-height: 24px;
  min-width: 24px;
  border-radius: 50%;
  border: 1px ${({ theme }) => theme.grey.soft} solid;
  background: transparent;
  cursor: pointer;

  &.medium {
    font-size: 1rem;
    min-height: 30px;
    min-width: 30px;
  }

  &.large {
    font-size: 1.2rem;
    min-height: 40px;
    min-width: 40px;
  }
`);
