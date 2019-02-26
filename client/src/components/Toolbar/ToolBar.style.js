import styled from 'styled-components';
import withTheme from '../../themes/withTheme';

export const Container = styled.div`
    margin-bottom: 24px;
    display: flex;
    align-items: center;

  .ui.button {
    margin-right: .5em;
  }
`;

export const Group = withTheme(styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`);
