import styled from 'styled-components';
import { Segment as SegmentSUI } from 'semantic-ui-react';

export const Segment = styled(SegmentSUI)`
  & {
    border: none;
  }

  &.ui.segment {
    margin: 0;
    margin-left: 8px;
    border: none;
    box-shadow: none;
  }
`;
