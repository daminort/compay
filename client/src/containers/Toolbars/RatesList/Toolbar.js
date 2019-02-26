import React, { Component } from 'react';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';

import Toolbar from '../../../components/Toolbar';
import MonthSelect from '../../../components/MonthSelect';

class RatesListToolbar extends Component {

  static propTypes = {
    RatesList : PropTypesMobX.observableObject.isRequired,
    Routing   : PropTypesMobX.observableObject.isRequired,
  }

  constructor(props) {
    super(props);
    this.onClickCreate       = this.onClickCreate.bind(this);
    this.onChangeShowDeleted = this.onChangeShowDeleted.bind(this);
    this.onChangeForDate     = this.onChangeForDate.bind(this);
  }

  onClickCreate() {
    const { Routing } = this.props;
    const { push } = Routing;

    push('/rates/create');
  }

  onChangeShowDeleted(showDeleted) {
    const { RatesList } = this.props;

    RatesList.setShowDeleted(showDeleted);
    RatesList.reloadList();
  }

  onChangeForDate({ value }) {
    const { RatesList } = this.props;

    RatesList.setForDate(value);
    RatesList.reloadList();
  }

  render() {
    const { RatesList } = this.props;
    const { forDate, showDeleted } = RatesList;

    const primary = {
      create: { onClick: this.onClickCreate },
    };
    const flags = {
      showDeleted: {
        checked  : showDeleted,
        onChange : this.onChangeShowDeleted,
      },
    };
    const extra = [
      <MonthSelect
        key="ratesForDate"
        dataID="ratesForDate"
        value={forDate}
        onChange={this.onChangeForDate}
      />,
    ];

    return (
      <Toolbar
        primary={primary}
        extra={extra}
        flags={flags}
        order={['primary', 'extra', 'flags']}
      />
    );
  }
}

export default inject('RatesList', 'Routing')(observer(RatesListToolbar));
