import React, { Component } from 'react';
import classNames from 'classnames';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';

import Intl from '../../languages';
import MainContainer from '../../containers/MainContainer';
import ServiceIcon from '../../components/ServiceIcon';
import ButtonsBlock from '../../components/ButtonsBlock';
import Table from '../../components/shared/Table';
import RateInfo from '../../components/popups/RateInfo';
import ToolBar from '../../containers/Toolbars/RatesList';

import Formatter from '../../helpers/Formatter';
import { sortRates } from '../../helpers/orderUtils';
import { CALCULATION_METHOD } from '../../constants/calculationMethods';

import { lang } from './lang';
import { Wrapper } from './RatesListPage.style';

class RatesListPage extends Component {

  static propTypes = {
    RatesList : PropTypesMobX.observableObject.isRequired,
    Routing   : PropTypesMobX.observableObject.isRequired,
    Settings  : PropTypesMobX.observableObject.isRequired,
  }

  static defineRowClassName(record) {

    return classNames({
      row: true,
      deleted: record.deleted,
    });
  }

  constructor(props) {
    super(props);

    this.onClickEdit    = this.onClickEdit.bind(this);
    this.onClickRemove  = this.onClickRemove.bind(this);
    this.onClickRestore = this.onClickRestore.bind(this);
    this.renderCell     = this.renderCell.bind(this);

    this.columns = [
      { dataIndex: 'icon', title: '', width: 1, render: this.renderCell, className: 'icon' },
      { dataIndex: 'serviceName', title: lang.name, render: this.renderCell },
      { dataIndex: 'startDate', title: lang.startDate, render: this.renderCell },
      { dataIndex: 'method', title: lang.method, render: this.renderCell },
      { dataIndex: 'rate', title: lang.rate, render: this.renderCell },
      { dataIndex: 'actions', title: lang.actions, width: 1, render: this.renderCell },
    ];
  }

  componentDidMount() {
    const { RatesList } = this.props;
    RatesList.reloadList();
  }

  // Events -------------------------------------------------------------------

  onClickEdit(id) {
    const { Routing } = this.props;
    const { push } = Routing;

    push(`/rates/edit/${id}`);
  }

  onClickRemove(id) {
    const { RatesList } = this.props;
    RatesList.removeRate(id);
  }

  onClickRestore(id) {
    const { RatesList } = this.props;
    RatesList.restoreRate(id);
  }

  // Renders ------------------------------------------------------------------
  renderCell(record, dataIndex) {

    const value       = record[dataIndex];
    const showRemove  = !record.deleted;
    const showRestore = record.deleted;

    switch (dataIndex) {

      case 'icon': {
        const iconName = record.service.icon;
        return (
          <ServiceIcon name={iconName} size="large" />
        );
      }

      case 'serviceName': {
        const serviceName = record.service.name;
        return serviceName;
      }

      case 'startDate': {
        return Formatter.date(value);
      }

      case 'method': {
        const methodNameID = CALCULATION_METHOD[record.methodID];
        return (
          <div className="method">
            <Intl id={methodNameID} />
            <div className="icon">
              <RateInfo
                methodID={record.methodID}
                rateData={record}
              />
            </div>
          </div>
        );
      }

      case 'rate': {
        return Formatter.sum(value);
      }

      case 'actions': {
        return (
          <ButtonsBlock
            edit
            remove={showRemove}
            restore={showRestore}
            id={record.id}
            editTitle={lang.edit}
            removeTitle={lang.remove}
            restoreTitle={lang.restore}
            buttonSize="medium"
            onEdit={this.onClickEdit}
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
    const { RatesList, Settings } = this.props;
    const { list } = RatesList;
    const { serviceOrder } = Settings;

    const resList = sortRates(list, serviceOrder);

    return (
      <MainContainer>
        <Wrapper>
          <ToolBar />
          <Table
            columns={this.columns}
            dataSource={resList}
            rowClassName={RatesListPage.defineRowClassName}
          />
        </Wrapper>
      </MainContainer>
    );
  }
}

export default inject('RatesList', 'Routing', 'Settings')(observer(RatesListPage));
