import React, { Component } from 'react';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';

import Toolbar from '../../../components/Toolbar';

class ScalesListToolbar extends Component {

  static propTypes = {
    ScalesList : PropTypesMobX.observableObject.isRequired,
    Routing    : PropTypesMobX.observableObject.isRequired,
  }

  constructor(props) {
    super(props);
    this.onChangeShowDeleted = this.onChangeShowDeleted.bind(this);
    this.onClickCreate       = this.onClickCreate.bind(this);
  }

  onChangeShowDeleted(showDeleted) {
    const { ScalesList } = this.props;

    ScalesList.setShowDeleted(showDeleted);
    ScalesList.reloadList();
  }

  onClickCreate() {
    const { Routing } = this.props;
    const { push } = Routing;

    push('/scales/create');
  }

  render() {
    const { ScalesList } = this.props;
    const { showDeleted } = ScalesList;

    const primary = {
      create: { onClick: this.onClickCreate },
    };
    const flags = {
      showDeleted: {
        checked  : showDeleted,
        onChange : this.onChangeShowDeleted,
      },
    };

    return (
      <Toolbar
        primary={primary}
        flags={flags}
      />
    );
  }
}

export default inject('ScalesList', 'Routing')(observer(ScalesListToolbar));
