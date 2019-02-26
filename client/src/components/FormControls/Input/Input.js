import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input as InputSUI } from 'semantic-ui-react';

import { FormField } from './Input.style';

class Input extends Component {

  static propTypes = {
    dataID     : PropTypes.string.isRequired,
    value      : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    noLabel    : PropTypes.bool,
    noMargin   : PropTypes.bool,
    label      : PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    labelWidth : PropTypes.string,
    onChange   : PropTypes.func,
  }

  static defaultProps = {
    value      : '',
    noLabel    : false,
    noMargin   : false,
    label      : '',
    labelWidth : '15%',
    onChange   : null,
  }

  constructor(props) {
    super(props);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(event, data) {
    const { dataID, onChange } = this.props;
    if (!onChange) {
      return;
    }

    onChange({
      event,
      data,
      dataID,
      value: data.value,
    });
  }

  render() {
    const { noLabel, noMargin, label, labelWidth, dataID, value, ...restProps } = this.props;

    let lw = '15%';
    if (noLabel) {
      lw = '0px';
    } else if (labelWidth) {
      lw = labelWidth;
    }

    const mb = noMargin ? '0' : '8px';

    return (
      <FormField inline labelwidth={lw} mb={mb}>
        <label>{label}</label>
        <InputSUI
          {...restProps}
          value={value || ''}
          onChange={this.onChangeValue}
        />
      </FormField>
    );
  }
}

export default Input;
