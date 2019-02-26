import React, { Component } from 'react';
import classNames from 'classnames';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';

import MainContainer from '../../containers/MainContainer';
import ServiceIcon from '../../components/ServiceIcon';
import ButtonsBlock from '../../components/ButtonsBlock';
import Table from '../../components/shared/Table';
import ToolBar from '../../containers/Toolbars/ServicesList';

import { sortServices } from '../../helpers/orderUtils';

import { lang } from './lang';
import { Wrapper } from './ServicesListPage.style';

class ServicesListPage extends Component {

  static propTypes = {
    ServicesList : PropTypesMobX.observableObject.isRequired,
    Routing      : PropTypesMobX.observableObject.isRequired,
    Settings     : PropTypesMobX.observableObject.isRequired,
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
      { dataIndex: 'name', title: lang.name, className: 'name' },
      { dataIndex: 'personalAccount', title: lang.personalAccount, className: 'personalAccount' },
      { dataIndex: 'actions', title: lang.actions, width: 1, render: this.renderCell, className: 'actions' },
    ];
  }

  componentDidMount() {
    const { ServicesList } = this.props;
    ServicesList.reloadList();
  }

  // Events -------------------------------------------------------------------

  onClickEdit(id) {
    const { Routing } = this.props;
    const { push } = Routing;

    push(`/services/edit/${id}`);
  }

  onClickRemove(id) {
    const { ServicesList } = this.props;
    ServicesList.removeService(id);
  }

  onClickRestore(id) {
    const { ServicesList } = this.props;
    ServicesList.restoreService(id);
  }

  // Renders ------------------------------------------------------------------

  renderCell(record, dataIndex) {

    const value       = record[dataIndex];
    const showRemove  = !record.deleted;
    const showRestore = record.deleted;

    switch (dataIndex) {

      case 'icon': {
        return (
          <ServiceIcon name={value} size="large" />
        );
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
    const { ServicesList, Settings } = this.props;
    const { list } = ServicesList;
    const { serviceOrder } = Settings;

    const resList = sortServices(list, serviceOrder);

    return (
      <MainContainer>
        <Wrapper>
          <ToolBar />
          <Table
            columns={this.columns}
            dataSource={resList}
            rowClassName={ServicesListPage.defineRowClassName}
          />
        </Wrapper>
      </MainContainer>
    );
  }
}

export default inject('ServicesList', 'Routing', 'Settings')(observer(ServicesListPage));
