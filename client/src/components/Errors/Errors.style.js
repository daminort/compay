import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  transition: all .3s linear;
  overflow: hidden;

  &.invisible {
    height: 0px;
    opacity: 0;
  }

  &.visible {
    height: 100%;
    opacity: 1;
  }

  .ui.message {
    min-height: 0px;
    position: initial;

    .close.icon {
      right: 1.5em;
      opacity: 1;
    }
  }

  .ui.icon.message {
    align-items: flex-start;

    .content {
      p {
        display: flex;
        flex-direction: column;
        opacity: 1;
      }
    }
  }
`;

export const Header = styled.div`
  font-weight: bold;
`;

export const Info = styled.span`
  padding-bottom: 8px;

  span {
    &:nth-child(2) {
      margin-left: 4px;
    }
    &:last-child {
      margin-left: 8px;
    }
  }
`;
