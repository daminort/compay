import React, { Component } from 'react';
import classNames from 'classnames';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';

import MainContainer from '../../containers/MainContainer';
import ServiceIcon from '../../components/ServiceIcon';
import ButtonsBlock from '../../components/ButtonsBlock';
import Table from '../../components/shared/Table';
import ToolBar from '../../containers/Toolbars/ScalesList';

import { lang } from './lang';
import { Wrapper } from './ServicesListPage.style';

class ScalesListPage extends Component {

  static propTypes = {
    ScalesList : PropTypesMobX.observableObject.isRequired,
    Routing    : PropTypesMobX.observableObject.isRequired,
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
      { dataIndex: 'service', title: lang.service, render: this.renderCell, className: 'service' },
      { dataIndex: 'name', title: lang.name, className: 'name' },
      { dataIndex: 'actions', title: lang.actions, width: 1, render: this.renderCell, className: 'actions' },
    ];
  }

  componentDidMount() {
    const { ScalesList } = this.props;
    ScalesList.reloadList();
  }

  // Events -------------------------------------------------------------------
  onClickEdit(id) {
    const { Routing } = this.props;
    const { push } = Routing;

    push(`/scales/edit/${id}`);
  }

  onClickRemove(id) {
    const { ScalesList } = this.props;
    ScalesList.removeScale(id);
  }

  onClickRestore(id) {
    const { ScalesList } = this.props;
    ScalesList.restoreScale(id);
  }

  // Renders ------------------------------------------------------------------
  renderCell(record, dataIndex) {

    const value       = record[dataIndex];
    const showRemove  = !record.deleted;
    const showRestore = record.deleted;

    switch (dataIndex) {

      case 'icon': {
        const iconName = record.service ? record.service.icon : '';
        return (
          <ServiceIcon name={iconName} size="large" />
        );
      }

      case 'service': {
        return record.service ? record.service.name : 'No service';
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
    const { ScalesList } = this.props;

    return (
      <MainContainer>
        <Wrapper>
          <ToolBar />
          <Table
            columns={this.columns}
            dataSource={ScalesList.list}
            rowClassName={ScalesListPage.defineRowClassName}
          />
        </Wrapper>
      </MainContainer>
    );
  }
}

export default inject('ScalesList', 'Routing')(observer(ScalesListPage));
