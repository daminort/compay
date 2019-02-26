import styled from 'styled-components';
import { Form } from 'semantic-ui-react';
import withTheme from '../../../themes/withTheme';

const FormFieldSUI  = Form.Field;

export const FormField = withTheme(styled(FormFieldSUI)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px 0 4px 0;
  margin-bottom: ${({ mb }) => mb};

  label {
    width: ${({ labelwidth }) => labelwidth};
    min-width: ${({ labelwidth }) => labelwidth};
  }
`);

export const Content = styled.div`
  &.bold {
    font-weight: bold;
  }
`;
