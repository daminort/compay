import styled from 'styled-components';
import { Button as ButtonSUI } from 'semantic-ui-react';

export const Button = styled(ButtonSUI)`
  &.ui.button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    min-height: 24px;
    min-width: 24px;

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
  }

  &.ui.circular.button {
    border-radius: 50%;
  }

  &.ui.icon.button {
    .icon {
      opacity: 1;
    }
  }
`;
