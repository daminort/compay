import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { FormField, Content } from './StaticText.style';

const StaticText = ({ bold, noLabel, noMargin, label, labelWidth, value }) => {
  let lw = '15%';
  if (noLabel) {
    lw = '0px';
  } else if (labelWidth) {
    lw = labelWidth;
  }

  const mb = noMargin ? '0' : '8px';
  const className = classnames({
    bold,
  });

  return (
    <FormField inline labelwidth={lw} mb={mb}>
      <label>{label}</label>
      <Content className={className}>
        {value}
      </Content>
    </FormField>
  );
};

StaticText.propTypes = {
  bold       : PropTypes.bool,
  value      : PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  noLabel    : PropTypes.bool,
  noMargin   : PropTypes.bool,
  label      : PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  labelWidth : PropTypes.string,
};

StaticText.defaultProps = {
  bold       : false,
  value      : '',
  noLabel    : false,
  noMargin   : false,
  label      : '',
  labelWidth : '15%',
};

export default StaticText;
