import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';
import { some } from 'lodash';

import InputNumber from '../../../components/FormControls/InputNumber';
import { lang } from '../lang';

class BoxSimleRate extends Component {

  static propTypes = {
    RateEdit : PropTypesMobX.observableObject.isRequired,
    disabled : PropTypes.bool,
    errors: PropTypes.arrayOf(PropTypes.shape({
      dataID  : PropTypes.string,
      message : PropTypes.string.isRequired,
    })),
  }

  static defaultProps = {
    disabled : false,
    errors   : [],
  }

  constructor(props) {
    super(props);
    this.onChangeRate = this.onChangeRate.bind(this);
  }

  onChangeRate({ value }) {
    const { RateEdit } = this.props;
    RateEdit.setRateData({ rate: value });
  }

  render() {
    const { RateEdit, errors, disabled } = this.props;
    const { rateItem } = RateEdit;
    const { rate } = rateItem;
    const isError = some(errors, { dataID: 'rate' });

    return (
      <InputNumber
        dataID="boxSimpleRate"
        label={lang.rate}
        value={rate}
        error={isError}
        disabled={disabled}
        onChange={this.onChangeRate}
      />
    );
  }
}

export default inject('RateEdit')(observer(BoxSimleRate));
