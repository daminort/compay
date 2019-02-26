import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';

import Intl from '../../../languages';
import Input from '../../../components/FormControls/Input';
import InputNumber from '../../../components/FormControls/InputNumber';
import NumberRange from '../../../components/FormControls/NumberRange';
import StaticText from '../../../components/FormControls/StaticText';

import { CALCULATION_METHOD } from '../../../constants/calculationMethods';

import { lang } from '../lang';

const labelWidth = '25%';

class CardCounterScale extends Component {

  static propTypes = {
    CalculationsList : PropTypesMobX.observableObject.isRequired,
    calculation      : PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.onChangeField   = this.onChangeField.bind(this);
    this.onChangeCounter = this.onChangeCounter.bind(this);
  }

  onChangeField({ dataID, value }) {
    const { CalculationsList, calculation } = this.props;
    const { id } = calculation;
    const item = CalculationsList.getItem(id);

    item[dataID] = value;
    CalculationsList.setItem(id, item);
  }

  onChangeCounter({ min, max }) {
    const { CalculationsList, calculation } = this.props;
    const { id } = calculation;
    const item = CalculationsList.getItem(id);

    item.counterMin = min;
    item.counterMax = max;
    CalculationsList.setItem(id, item);
  }

  render() {
    const { calculation } = this.props;
    const { rate, counterMin, counterMax, calcResult, paymentSum, comment, scaleInfo } = calculation;
    const { methodID } = rate;

    const methodValueID = CALCULATION_METHOD[methodID];

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
          label={lang.scale}
          labelWidth={labelWidth}
          value={scaleInfo}
        />
        <NumberRange
          dataID="counter"
          label={lang.counter}
          labelWidth={labelWidth}
          min={counterMin}
          max={counterMax}
          onChange={this.onChangeCounter}
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

export default inject('CalculationsList')(observer(CardCounterScale));
