import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormField } from './FormControl.style';

class FormControl extends Component {

  static propTypes = {
    children   : PropTypes.element.isRequired,
    noLabel    : PropTypes.bool,
    noMargin   : PropTypes.bool,
    label      : PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    labelWidth : PropTypes.string,
  }

  static defaultProps = {
    noLabel    : false,
    noMargin   : false,
    label      : '',
    labelWidth : '15%',
  }

  render() {
    const { noLabel, noMargin, label, labelWidth, children } = this.props;

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
        {children}
      </FormField>
    );
  }
}

export default FormControl;
