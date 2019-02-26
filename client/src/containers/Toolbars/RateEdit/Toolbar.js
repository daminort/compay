import React, { Component } from 'react';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';

import Toolbar from '../../../components/Toolbar';
import { validateRate } from '../../../helpers/rateUtils';

class RateEditToolbar extends Component {

  static propTypes = {
    RateEdit  : PropTypesMobX.observableObject.isRequired,
    RatesList : PropTypesMobX.observableObject.isRequired,
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
    const { RateEdit } = this.props;
    const { rateID, rateItem } = RateEdit;

    const errors = validateRate(rateItem);
    RateEdit.setErrors(errors);
    if (RateEdit.isErrors) {
      return;
    }

    if (rateID) {
      RateEdit.rateUpdate(rateID, rateItem);
    } else {
      RateEdit.rateCreate(rateItem);
    }
  }

  onClickRefresh() {
    const { RateEdit } = this.props;
    const { rateID }   = RateEdit;

    RateEdit.reloadRateData(rateID);
  }

  async onClickRemove() {
    const { RatesList, RateEdit } = this.props;
    const { rateID } = RateEdit;

    await RatesList.removeRate(rateID);
    await RateEdit.reloadRateData(rateID);
  }

  async onClickRestore() {
    const { RatesList, RateEdit } = this.props;
    const { rateID } = RateEdit;

    await RatesList.restoreRate(rateID);
    await RateEdit.reloadRateData(rateID);
  }

  // Renders ------------------------------------------------------------------

  render() {
    const { RateEdit } = this.props;
    const { rateID, rateItem } = RateEdit;
    const { deleted } = rateItem;

    const primary = {
      save    : { onClick : this.onClickSave },
      refresh : rateID ? { onClick : this.onClickRefresh } : null,
    };
    const operations = {
      remove  : rateID ? { onClick: this.onClickRemove } : null,
      restore : rateID ? { onClick: this.onClickRestore } : null,
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

export default inject('RateEdit', 'RatesList')(observer(RateEditToolbar));
