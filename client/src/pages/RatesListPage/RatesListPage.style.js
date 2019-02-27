import styled from 'styled-components';

export const Wrapper = styled.div`

  .row {
    .buttons-block {
      opacity: 0;
      transition: all 0.2s linear;
    }

    .method {
      display: flex;
      align-items: center;

      .icon {
        margin-left: 8px;
        opacity: 0;
        transition: all 0.2s linear;
      }
    }

    &:hover {
      .buttons-block {
        opacity: 1;
      }
      .method {
        .icon {
          opacity: 1;
        }
      }
    }

    
  }

  .row.deleted {
    opacity: .5;
  }
`;
