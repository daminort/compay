import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  
  .ui.table {
    td {
      vertical-align: ${({ verticalAlign }) => verticalAlign || 'middle'};
    }
  }
`;
