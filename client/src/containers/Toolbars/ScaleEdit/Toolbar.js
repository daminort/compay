import React, { Component } from 'react';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';
import { last, isEmpty, toInteger } from 'lodash';

import Toolbar from '../../../components/Toolbar';

import { maxCounterValue } from '../../../config';
import { validateRange } from '../../../helpers/scaleUtils';

import { lang } from './lang';
import { Notice } from './ToolBar.style';

class ScaleEditToolbar extends Component {

  static propTypes = {
    ScaleEdit  : PropTypesMobX.observableObject.isRequired,
    ScalesList : PropTypesMobX.observableObject.isRequired,
  }

  constructor(props) {
    super(props);
    this.onClickSave     = this.onClickSave.bind(this);
    this.onClickRefresh  = this.onClickRefresh.bind(this);
    this.onClickRemove   = this.onClickRemove.bind(this);
    this.onClickRestore  = this.onClickRestore.bind(this);
    this.onClickAddRange = this.onClickAddRange.bind(this);
  }

  // Events -------------------------------------------------------------------

  onClickSave() {
    const { ScaleEdit } = this.props;
    const { scaleID, scaleItem, scaleItemRanges } = ScaleEdit;

    const errors = validateRange(scaleItemRanges);
    ScaleEdit.setErrors(errors);
    if (ScaleEdit.isErrors) {
      return;
    }

    if (scaleID) {
      ScaleEdit.scaleUpdate(scaleID, scaleItem);
    } else {
      ScaleEdit.scaleCreate(scaleItem);
    }
  }

  onClickRefresh() {
    const { ScaleEdit } = this.props;
    const { scaleID }   = ScaleEdit;

    ScaleEdit.reloadScaleData(scaleID);
  }

  async onClickRemove() {
    const { ScalesList, ScaleEdit } = this.props;
    const { scaleID } = ScaleEdit;

    await ScalesList.removeScale(scaleID);
    await ScaleEdit.reloadScaleData(scaleID);
  }

  async onClickRestore() {
    const { ScalesList, ScaleEdit } = this.props;
    const { scaleID } = ScaleEdit;

    await ScalesList.restoreScale(scaleID);
    await ScaleEdit.reloadScaleData(scaleID);
  }

  onClickAddRange() {
    const { ScaleEdit } = this.props;
    const result = ScaleEdit.scaleItemRanges;

    if (isEmpty(result)) {
      result.push({
        counterMin: 0,
        counterMax: 100,
      });
    } else {
      const lastItem = last(result);
      const counterMin = (lastItem.counterMax < maxCounterValue)
        ? toInteger(lastItem.counterMax) + 1
        : 0;

      result.push({
        counterMin,
        counterMax: maxCounterValue,
      });
    }

    ScaleEdit.setScaleRange(result);
  }

  // Renders ------------------------------------------------------------------

  render() {
    const { ScaleEdit } = this.props;
    const { scaleID, scaleItem } = ScaleEdit;
    const { deleted } = scaleItem;

    const primary = {
      save    : { onClick : this.onClickSave },
      refresh : scaleID ? { onClick : this.onClickRefresh } : null,
    };
    const middle = {
      range   : { onClick : this.onClickAddRange },
    };
    const operations = {
      remove  : scaleID ? { onClick: this.onClickRemove } : null,
      restore : scaleID ? { onClick: this.onClickRestore } : null,
    };
    const extra = [
      (!scaleID && <Notice key="notice">{lang.createWarning}</Notice>),
    ];

    return (
      <Toolbar
        deleted={deleted}
        primary={primary}
        middle={middle}
        operations={operations}
        extra={extra}
      />
    );
  }
}

export default inject('ScaleEdit', 'ScalesList')(observer(ScaleEditToolbar));
