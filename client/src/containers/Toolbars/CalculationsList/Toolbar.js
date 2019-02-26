import React, { Component } from 'react';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';

import Toolbar from '../../../components/Toolbar';
import MonthSelect from '../../../components/MonthSelect';

import CalculationFactory from '../../../api/factories/CalculationFactory';
import { showError } from '../../../helpers/notifications';

class CalculationsListToolbar extends Component {

  static propTypes = {
    CalculationsList : PropTypesMobX.observableObject.isRequired,
  }

  constructor(props) {
    super(props);
    this.onClickSave       = this.onClickSave.bind(this);
    this.onClickCalculate  = this.onClickCalculate.bind(this);
    this.onClickRefresh    = this.onClickRefresh.bind(this);
    this.onChangeShowEmpty = this.onChangeShowEmpty.bind(this);
    this.onChangePeriod    = this.onChangePeriod.bind(this);
  }

  onClickSave() {
    const { CalculationsList } = this.props;
    const errors = CalculationFactory.validateAll(CalculationsList.list);
    if (errors) {
      errors.forEach(error => {
        showError({ ...error });
      });
      return;
    }

    CalculationsList.saveAll();
  }

  onClickCalculate() {
    const { CalculationsList } = this.props;
    CalculationsList.calculateAll();
  }

  onClickRefresh() {
    const { CalculationsList } = this.props;
    CalculationsList.reloadList();
  }

  onChangeShowEmpty(showEmpty) {
    const { CalculationsList } = this.props;
    CalculationsList.setShowEmpty(showEmpty);
  }

  onChangePeriod({ value }) {
    const { CalculationsList } = this.props;

    CalculationsList.setPeriod(value);
    CalculationsList.reloadList();
  }

  render() {
    const { CalculationsList } = this.props;
    const { period, showEmpty } = CalculationsList;

    const primary = {
      save      : { onClick: this.onClickSave },
      calculate : { onClick: this.onClickCalculate },
      refresh   : { onClick: this.onClickRefresh },
    };
    const flags = {
      showEmpty: {
        checked  : showEmpty,
        onChange : this.onChangeShowEmpty,
      },
    };
    const extra = [
      <MonthSelect
        key="calculationsPeriod"
        dataID="calculationsPeriod"
        value={period}
        onChange={this.onChangePeriod}
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

export default inject('CalculationsList')(observer(CalculationsListToolbar));
