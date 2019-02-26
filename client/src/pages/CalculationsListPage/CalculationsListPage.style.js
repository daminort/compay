import styled from 'styled-components';
import withTheme from '../../themes/withTheme';

export const Wrapper = withTheme(styled.div`

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

  .ui.table {
    th.one.wide.selected {
      width: 20px;
    }
    .row {
      td {
        .ui.fitted.checkbox {
          margin-top: 4px;
        }
        .num {
          display: block;
          width: 100%;
          text-align: right;
        }
        .more {
          color: ${({ theme }) => theme.common.info};
        }
        .less {
          color: ${({ theme }) => theme.common.warning};
        }
      }
    }
    .table-totals {
      font-weight: bold;
      .more {
          color: ${({ theme }) => theme.common.info};
      }
      .less {
        color: ${({ theme }) => theme.common.warning};
      }
    }
  }
`);
