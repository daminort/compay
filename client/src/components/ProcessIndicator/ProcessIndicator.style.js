import styled from 'styled-components';
import withTheme from '../../themes/withTheme';

export const Wrapper = withTheme(styled.div`
  display: flex;
  align-items: center;

  &.inert {
    color: ${({ theme }) => theme.text.secondaryDark};
  }
  &.loading {
    color: ${({ theme }) => theme.text.mainDark};
  }
  &.completed {
    color: ${({ theme }) => theme.common.success};
  }
  &.error {
    color: ${({ theme }) => theme.common.error};
  }

  .ui.loader {
    margin-right: 8px;
  }
  .icon {
    margin-right: 4px;
  }
`);
