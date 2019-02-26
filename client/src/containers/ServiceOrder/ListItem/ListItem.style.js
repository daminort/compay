import styled from 'styled-components';
import withTheme from '../../../themes/withTheme';

export const Wrapper = withTheme(styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 24px;
  max-width: 25%;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.bg.orderHover};
  }

  .icon {
    max-width: 24px;
  }
`);

export const Name = styled.div`
  margin-left: 16px;
`;
