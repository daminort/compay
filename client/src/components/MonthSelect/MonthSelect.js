import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Dropdown } from 'semantic-ui-react';

import Formatter from '../../helpers/Formatter';

import Item from './Item';

class MonthSelect extends Component {

  static propTypes = {
    dataID     : PropTypes.string.isRequired,
    value      : PropTypes.string.isRequired,
    onChange   : PropTypes.func.isRequired,
    maxValue   : PropTypes.string,
    monthCount : PropTypes.number,
    disabled   : PropTypes.bool,
  }

  static defaultProps = {
    maxValue   : Formatter.startMonth(),
    monthCount : 36,
    disabled   : false,
  }

  constructor(props) {
    super(props);
    this.onChangeMonth = this.onChangeMonth.bind(this);
  }

  onChangeMonth(event, data) {
    const { dataID, onChange } = this.props;
    onChange({
      dataID,
      event,
      value: data.value,
    });
  }

  renderOptions() {
    const { maxValue, monthCount } = this.props;
    const startValue = moment(maxValue).startOf('month');

    const options = [];
    for (let i = 0; i <= monthCount; i++) {
      const currentValue = startValue.clone().subtract(i, 'month');
      const month  = currentValue.month();
      const year   = currentValue.year();
      options.push({
        value : Formatter.startMonth(currentValue),
        text  : (<Item month={month} year={year} key={i} />),
      });
    }

    return options;
  }

  render() {
    const { disabled, value } = this.props;
    const options = this.renderOptions();

    return (
      <Dropdown
        selection
        item
        disabled={disabled}
        value={value}
        options={options}
        onChange={this.onChangeMonth}
      />
    );
  }
}

export default MonthSelect;
