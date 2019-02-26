import React, { Component, Fragment } from 'react';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';

import FormControl from '../../../components/FormControls/FormControl';
import InputNumber from '../../../components/FormControls/InputNumber';

import { FORMULAS } from '../../../constants/formulas';

import SelectFormula from '../../SelectFormula';
import BoxSimleRate from '../BoxSimleRate';
import { lang } from '../lang';

class BoxFormula extends Component {

  static propTypes = {
    RateEdit : PropTypesMobX.observableObject.isRequired,
  }

  constructor(props) {
    super(props);
    this.onChangeField = this.onChangeField.bind(this);
  }

  onChangeField({ dataID, value }) {
    const { RateEdit } = this.props;
    RateEdit.setRateData({ [dataID]: value });
  }

  render() {
    const { RateEdit } = this.props;
    const { rateItem } = RateEdit;
    const { formulaID, argument } = rateItem;

    let argLabel = lang.argument;
    if (formulaID === FORMULAS.area)   { argLabel = lang.area;   }
    if (formulaID === FORMULAS.people) { argLabel = lang.people; }

    return (
      <Fragment>
        <FormControl label={lang.formula}>
          <SelectFormula
            dataID="formulaID"
            value={formulaID}
            onChange={this.onChangeField}
          />
        </FormControl>

        <InputNumber
          dataID="argument"
          label={argLabel}
          value={argument}
          onChange={this.onChangeField}
        />

        <BoxSimleRate />

      </Fragment>
    );
  }
}

export default inject('RateEdit')(observer(BoxFormula));
