import styled from 'styled-components';
import withTheme from '../../../themes/withTheme';

export const Notice = withTheme(styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text.info};
`);
