import React, { Component } from 'react';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';

import Toolbar from '../../../components/Toolbar';

class ServiceEditToolbar extends Component {

  static propTypes = {
    ServiceEdit  : PropTypesMobX.observableObject.isRequired,
    ServicesList : PropTypesMobX.observableObject.isRequired,
  }

  constructor(props) {
    super(props);
    this.onClickSave    = this.onClickSave.bind(this);
    this.onClickRefresh = this.onClickRefresh.bind(this);
    this.onClickRemove  = this.onClickRemove.bind(this);
    this.onClickRestore = this.onClickRestore.bind(this);
  }

  // Events -------------------------------------------------------------------

  onClickSave() {
    const { ServiceEdit } = this.props;
    const { serviceID, serviceItem } = ServiceEdit;

    ServiceEdit.serviceSave(serviceID, serviceItem);
  }

  onClickRefresh() {
    const { ServiceEdit } = this.props;
    const { serviceID }   = ServiceEdit;

    ServiceEdit.reloadServiceData(serviceID);
  }

  onClickRemove() {
    const { ServicesList, ServiceEdit } = this.props;
    const { serviceID } = ServiceEdit;

    ServicesList.removeService(serviceID);
    ServiceEdit.reloadServiceData(serviceID);
  }

  onClickRestore() {
    const { ServicesList, ServiceEdit } = this.props;
    const { serviceID } = ServiceEdit;

    ServicesList.restoreService(serviceID);
    ServiceEdit.reloadServiceData(serviceID);
  }

  render() {
    const { ServiceEdit } = this.props;
    const { serviceItem } = ServiceEdit;
    const { deleted }     = serviceItem;

    const primary = {
      save    : { onClick : this.onClickSave },
      refresh : { onClick : this.onClickRefresh },
    };
    const operations = {
      remove  : { onClick: this.onClickRemove },
      restore : { onClick: this.onClickRestore },
    };

    return (
      <Toolbar
        deleted={deleted}
        primary={primary}
        operations={operations}
      />
    );
  }
}

export default inject('ServiceEdit', 'ServicesList')(observer(ServiceEditToolbar));
