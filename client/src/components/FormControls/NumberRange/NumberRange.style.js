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

  .ui.input {
    width: 100% !important;
  }

  .ui.disabled.input {
    opacity: .85;

    input[disabled] {
      background: ${({ theme }) => theme.bg.disabledInput};
    }
  }
`);

export const Holder = withTheme(styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;

  .ui.input {
    width: 100% !important;
  }

  .ui.disabled.input {
    opacity: .85;

    input[disabled] {
      background: ${({ theme }) => theme.bg.disabledInput};
    }
  }
`);

export const Delimiter = styled.div`
  width: 16px;
`;
