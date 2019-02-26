import styled from 'styled-components';
import withTheme from '../../../themes/withTheme';

export const IconHolder = withTheme(styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px dotted ${({ theme }) => theme.border.main};
`);
