import React, { Component } from 'react';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';

import Toolbar from '../../../components/Toolbar';

class ServiceOrderToolbar extends Component {

  static propTypes = {
    Settings : PropTypesMobX.observableObject.isRequired,
  }

  constructor(props) {
    super(props);
    this.onClickSave   = this.onClickSave.bind(this);
    this.onClickReload = this.onClickReload.bind(this);
    this.onClickReset  = this.onClickReset.bind(this);
  }

  onClickSave() {
    const { Settings } = this.props;
    const { serviceOrder } = Settings;

    Settings.saveServiceOrder(serviceOrder);
  }

  onClickReload() {
    const { Settings } = this.props;
    Settings.loadServiceOrder();
  }

  onClickReset() {
    const { Settings } = this.props;
    Settings.resetServiceOrder();
  }

  render() {
    const primary = {
      save: { onClick : this.onClickSave },
      refresh: { onClick : this.onClickReload },
    };
    const operations = {
      reset: { onClick : this.onClickReset },
    };

    return (
      <Toolbar primary={primary} operations={operations} />
    );
  }
}

export default inject('Settings')(observer(ServiceOrderToolbar));
