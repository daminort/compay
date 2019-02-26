import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toNumber } from 'lodash';
import { Input as InputSUI } from 'semantic-ui-react';

import { FormField } from './InputNumber.style';

class InputNumber extends Component {

  static propTypes = {
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
    this.onBlur        = this.onBlur.bind(this);
  }

  onChangeValue(event, data) {
    const { dataID, onChange } = this.props;
    if (!onChange) {
      return;
    }

    let resultValue = '';
    const regex = /^(-)?([0-9]+)?(,|\.)?([0-9]+)?/gm;
    const matches = regex.exec(data.value);
    if (matches && matches.length > 0) {
      resultValue = String(matches[0]).replace(',', '.');
    }

    onChange({
      event,
      data,
      dataID,
      value: toNumber(resultValue),
    });
  }

  onBlur(event, data) {
    const { dataID, onChange } = this.props;
    if (!onChange) {
      return;
    }

    onChange({
      event,
      data,
      dataID,
      value: toNumber(event.target.value),
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
          type="number"
          value={value || ''}
          onChange={this.onChangeValue}
          onBlur={this.onBlur}
        />
      </FormField>
    );
  }
}

export default InputNumber;
