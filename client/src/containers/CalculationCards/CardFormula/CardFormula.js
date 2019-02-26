import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';

import Intl from '../../../languages';
import Input from '../../../components/FormControls/Input';
import InputNumber from '../../../components/FormControls/InputNumber';
import StaticText from '../../../components/FormControls/StaticText';

import Formatter from '../../../helpers/Formatter';
import { CALCULATION_METHOD } from '../../../constants/calculationMethods';
import { FORMULAS } from '../../../constants/formulas';

import { lang } from '../lang';

const labelWidth = '25%';

class CardFormula extends Component {

  static propTypes = {
    CalculationsList : PropTypesMobX.observableObject.isRequired,
    calculation      : PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.onChangeField = this.onChangeField.bind(this);
  }

  onChangeField({ dataID, value }) {
    const { CalculationsList, calculation } = this.props;
    const { id } = calculation;
    const item = CalculationsList.getItem(id);

    item[dataID] = value;
    CalculationsList.setItem(id, item);
  }

  render() {
    const { calculation } = this.props;
    const { rate, calcResult, paymentSum, comment } = calculation;
    const { methodID, formulaID, argument } = rate;

    const methodValueID  = CALCULATION_METHOD[methodID];
    const formulaValueID = FORMULAS[formulaID];
    const resultValue    = `${Formatter.number(argument)} x ${Formatter.sum(rate.rate)}`;

    return (
      <Fragment>
        <StaticText
          bold
          label={lang.method}
          labelWidth={labelWidth}
          value={(<Intl id={methodValueID} />)}
        />
        <StaticText
          bold
          label={lang.formula}
          labelWidth={labelWidth}
          value={(<Intl id={formulaValueID} />)}
        />
        <StaticText
          bold
          label={lang.rate}
          labelWidth={labelWidth}
          value={resultValue}
        />
        <InputNumber
          disabled
          dataID="calcResult"
          label={lang.calcResult}
          labelWidth={labelWidth}
          value={calcResult}
          onChange={this.onChangeField}
        />
        <InputNumber
          dataID="paymentSum"
          label={lang.paymentSum}
          labelWidth={labelWidth}
          value={paymentSum}
          onChange={this.onChangeField}
        />
        <Input
          dataID="comment"
          label={lang.comment}
          labelWidth={labelWidth}
          value={comment}
          onChange={this.onChangeField}
        />
      </Fragment>
    );
  }
}

export default inject('CalculationsList')(observer(CardFormula));
