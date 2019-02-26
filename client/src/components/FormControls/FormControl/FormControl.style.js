import styled from 'styled-components';
import { Form } from 'semantic-ui-react';
import withTheme from '../../../themes/withTheme';

const FormFieldSUI  = Form.Field;

export const FormField = withTheme(styled(FormFieldSUI)`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${({ mb }) => mb};

  label {
    width: ${({ labelwidth }) => labelwidth};
    min-width: ${({ labelwidth }) => labelwidth};
  }

  .ui.disabled.dropdown {
    opacity: .85;
    background: ${({ theme }) => theme.bg.disabledInput};
  }
`);
