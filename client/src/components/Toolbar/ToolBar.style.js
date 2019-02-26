import styled from 'styled-components';
import { Container as ContainerSUI } from 'semantic-ui-react';
import withTheme from '../../themes/withTheme';

export const Container = styled(ContainerSUI)`
  &.ui.container {
    margin-bottom: 24px;
    display: flex;
    align-items: center;
  }

  .ui.button {
    margin-right: .5em;
  }
`;

export const Group = withTheme(styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`);
