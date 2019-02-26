import React, { Component } from 'react';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';

import Toolbar from '../../../components/Toolbar';

class ServicesListToolbar extends Component {

  static propTypes = {
    ServicesList : PropTypesMobX.observableObject.isRequired,
  }

  constructor(props) {
    super(props);
    this.onChangeShowDeleted = this.onChangeShowDeleted.bind(this);
  }

  onChangeShowDeleted(showDeleted) {
    const { ServicesList } = this.props;

    ServicesList.setShowDeleted(showDeleted);
    ServicesList.reloadList();
  }

  render() {
    const { ServicesList } = this.props;
    const { showDeleted } = ServicesList;

    const flags = {
      showDeleted: {
        checked  : showDeleted,
        onChange : this.onChangeShowDeleted,
      },
    };

    return (
      <Toolbar flags={flags} />
    );
  }
}

export default inject('ServicesList')(observer(ServicesListToolbar));
