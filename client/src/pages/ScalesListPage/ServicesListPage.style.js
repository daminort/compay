import styled from 'styled-components';

export const Wrapper = styled.div`

  .row {
    .buttons-block {
      opacity: 0;
    }

    &:hover {
      .buttons-block {
        opacity: 1;
      }
    }
  }

  .row.deleted {
    opacity: .5;
  }
`;
