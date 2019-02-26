import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toNumber } from 'lodash';
import { Input as InputSUI } from 'semantic-ui-react';

import { FormField, Holder, Delimiter } from './NumberRange.style';

class NumberRange extends Component {

  static propTypes = {
    dataID     : PropTypes.string.isRequired,
    min        : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    max        : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    noLabel    : PropTypes.bool,
    noMargin   : PropTypes.bool,
    label      : PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    labelWidth : PropTypes.string,
    onChange   : PropTypes.func,
  }

  static defaultProps = {
    min        : 0,
    max        : 0,
    noLabel    : false,
    noMargin   : false,
    label      : '',
    labelWidth : '15%',
    onChange   : null,
  }

  constructor(props) {
    super(props);
    this.convertValue  = this.convertValue.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onBlur        = this.onBlur.bind(this);
  }

  convertValue(value) {
    let resultValue = '';
    const regex = /^(-)?([0-9]+)?(,|\.)?([0-9]+)?/gm;
    const matches = regex.exec(value);
    if (matches && matches.length > 0) {
      resultValue = String(matches[0]).replace(',', '.');
    }

    return toNumber(resultValue);
  }

  onChangeValue(event, data) {
    const { dataID, min, max, onChange } = this.props;
    if (!onChange) {
      return;
    }
    const { target } = event;
    const { value }  = target;
    const { name }   = data;
    const result = {
      event,
      data,
      dataID,
      min,
      max,
    };
    result[name] = this.convertValue(value);

    onChange(result);
  }

  onBlur(event, data) {
    this.onChangeValue(event, data);
  }

  render() {
    const { noLabel, noMargin, label, labelWidth, min, max } = this.props;

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
        <Holder>
          <InputSUI
            name="min"
            type="number"
            value={min || ''}
            onChange={this.onChangeValue}
          />
          <Delimiter />
          <InputSUI
            name="max"
            type="number"
            value={max || ''}
            onChange={this.onChangeValue}
          />
        </Holder>
      </FormField>
    );
  }
}

export default NumberRange;
