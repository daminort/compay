import React, { Component } from 'react';
import classNames from 'classnames';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';
import { some, every } from 'lodash';

import MainContainer from '../../containers/MainContainer';
import ServiceIcon from '../../components/ServiceIcon';
import ButtonsBlock from '../../components/ButtonsBlock';
import Table from '../../components/shared/Table';
import Checkbox from '../../components/ui/Checkbox';

import ToolBar from '../../containers/Toolbars/CalculationsList';
import CalcService from '../../containers/CalcService';

import Formatter from '../../helpers/Formatter';
import { sortCalculations } from '../../helpers/orderUtils';
import { CALCULATION_METHOD } from '../../constants/calculationMethods';

import { lang } from './lang';
import { Wrapper } from './CalculationsListPage.style';

class CalculationsListPage extends Component {

  static propTypes = {
    CalculationsList : PropTypesMobX.observableObject.isRequired,
    Settings         : PropTypesMobX.observableObject.isRequired,
  }

  static defineRowClassName(record) {

    return classNames({
      row: true,
      deleted: record.deleted,
    });
  }

  constructor(props) {
    super(props);

    this.onClickRemove        = this.onClickRemove.bind(this);
    this.onChangeSelected     = this.onChangeSelected.bind(this);
    this.onChangeSelectedAll  = this.onChangeSelectedAll.bind(this);
    this.renderHeaderSelected = this.renderHeaderSelected.bind(this);
    this.renderCell           = this.renderCell.bind(this);

    this.columns = [
      { dataIndex: 'selected',
        title: '',
        width: 1,
        render: this.renderCell,
        headerClass: 'selected',
        headerComponent: null,
      },
      { dataIndex: 'icon', title: '', width: 1, render: this.renderCell, className: 'icon' },
      { dataIndex: 'serviceName', title: lang.name, render: this.renderCell },
      { dataIndex: 'counter', title: lang.counter, width: 1, render: this.renderCell },
      { dataIndex: 'calcResult', title: lang.calcResult, width: 1, render: this.renderCell },
      { dataIndex: 'paymentSum', title: lang.paymentSum, width: 1, render: this.renderCell },
      { dataIndex: 'actions', title: lang.actions, width: 1, render: this.renderCell },
    ];
    this.totals = ['calcResult', 'paymentSum'];
  }

  componentDidMount() {
    const { CalculationsList } = this.props;
    CalculationsList.reloadList();
  }

  // Events -------------------------------------------------------------------

  onClickRemove(id) {
    const { CalculationsList } = this.props;
    CalculationsList.removeCalculation(id);
  }

  onChangeSelected(id, selected) {
    const { CalculationsList } = this.props;
    CalculationsList.setSelected(id, selected);
  }

  onChangeSelectedAll(selected) {
    const { CalculationsList } = this.props;
    const { list } = CalculationsList;
    list.forEach(item => {
      item.selected = selected;
    });
    CalculationsList.setList(list);
  }

  // Renders ------------------------------------------------------------------
  renderHeaderSelected() {
    const { CalculationsList } = this.props;
    const { list } = CalculationsList;
    const isChecked = list.length > 0 && every(list, { selected: true });
    const isIndeterminate = !isChecked && some(list, { selected: true });

    return (
      <Checkbox
        checked={isChecked}
        indeterminate={isIndeterminate}
        onChange={() => this.onChangeSelectedAll(!isChecked)}
      />
    );
  }

  renderCell(record, dataIndex) {
    const value       = record[dataIndex];
    const showRemove  = !record.deleted;
    const showRestore = record.deleted;

    const { id } = record;
    if (!id && !this.totals.includes(dataIndex)) {
      return null;
    }

    switch (dataIndex) {
      case 'selected': {
        return (
          <Checkbox
            checked={value}
            onChange={() => this.onChangeSelected(record.id, !value)}
          />
        );
      }
      case 'icon': {
        const iconName = record.service.icon;
        return (
          <ServiceIcon name={iconName} size="large" />
        );
      }
      case 'serviceName': {
        const serviceName = record.service.name;
        return (
          <CalcService
            title={serviceName}
            calculation={record}
          />
        );
      }
      case 'counter': {
        const { methodID } = record.rate;
        if (methodID === CALCULATION_METHOD.counter || methodID === CALCULATION_METHOD.counterScale) {
          return `${record.counterMin} / ${record.counterMax}`;
        }

        return '';
      }
      case 'calcResult': {
        return (
          <span className="num">
            {Formatter.sum(value)}
          </span>
        );
      }
      case 'paymentSum': {
        const { calcResult } = record;
        const className = classNames({
          num: true,
          more: value > calcResult,
          less: value < calcResult,
        });

        return (
          <span className={className}>
            {Formatter.sum(value)}
          </span>
        );
      }
      case 'actions': {
        return (
          <ButtonsBlock
            remove={showRemove}
            restore={showRestore}
            id={record.id}
            editTitle={lang.edit}
            removeTitle={lang.remove}
            restoreTitle={lang.restore}
            buttonSize="medium"
            onRemove={this.onClickRemove}
            onRestore={this.onClickRestore}
          />
        );
      }
      default:
        return value;
    }
  }

  render() {
    const { CalculationsList, Settings } = this.props;
    const { list } = CalculationsList;
    const { serviceOrder } = Settings;

    this.columns[0].headerComponent = this.renderHeaderSelected();
    const resList = sortCalculations(list, serviceOrder);

    return (
      <MainContainer>
        <Wrapper>
          <ToolBar />
          <Table
            columns={this.columns}
            dataSource={resList}
            totals={this.totals}
            rowClassName={CalculationsListPage.defineRowClassName}
          />
        </Wrapper>
      </MainContainer>
    );
  }
}

export default inject('CalculationsList', 'Settings')(observer(CalculationsListPage));
