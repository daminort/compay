import { toNumber } from 'lodash';
import { CALCULATION_METHOD } from '../../constants/calculationMethods';
import { NOTIFICATION_ERRORS } from '../../constants/notifications';

class CalculationFactory {

  calculateAll(calculationList) {

    calculationList.forEach(calculation => {
      const { rate, selected } = calculation;
      if (!selected) {
        return;
      }
      const { methodID, argument } = rate;

      switch (methodID) {
        case CALCULATION_METHOD.manual: {
          if (!calculation.calcResult) {
            calculation.error = NOTIFICATION_ERRORS.calculationIncorrectManual;
          } else {
            calculation.paymentSum = calculation.calcResult;
            calculation.error = null;
            }
          break;
        }
        case CALCULATION_METHOD.fixSum: {
          const result           = rate.rate;
          calculation.calcResult = result;
          calculation.paymentSum = result;
          calculation.error      = null;
          break;
        }
        case CALCULATION_METHOD.formula: {
          const fixedRate     = toNumber(rate.rate).toFixed(2);
          const fixedArgument = toNumber(argument).toFixed(2);
          const result        = (fixedRate * fixedArgument).toFixed(2);

          calculation.calcResult = result;
          calculation.paymentSum = result;
          calculation.error      = null;

          break;
        }
        case CALCULATION_METHOD.counter: {
          this.calculateCounter(calculation);
          break;
        }
        case CALCULATION_METHOD.counterScale: {
          this.calculateCounterScale(calculation);
          break;
        }
        default:
      }
    });

    return calculationList;
  }

  calculateCounter(calculation) {
    const { rate, counterMin, counterMax } = calculation;
    if (!counterMin || !counterMax) {
      calculation.error = NOTIFICATION_ERRORS.calculationIncorrectCounters;
      return;
    }
    if (counterMin >= counterMax) {
      calculation.error = NOTIFICATION_ERRORS.calculationIncorrectCounters;
      return;
    }

    const diff      = counterMax - counterMin;
    const fixedRate = toNumber(rate.rate).toFixed(2);
    const result    = (fixedRate * diff).toFixed(2);

    calculation.calcResult = result;
    calculation.paymentSum = result;
    calculation.error      = null;
  }

  calculateCounterScale(calculation) {
    const { rate, counterMin, counterMax } = calculation;
    const { ranges } = rate;
    if (!counterMin || !counterMax) {
      calculation.error = NOTIFICATION_ERRORS.calculationIncorrectCounters;
      return;
    }
    if (counterMin >= counterMax) {
      calculation.error = NOTIFICATION_ERRORS.calculationIncorrectCounters;
      return;
    }

    let diff   = counterMax - counterMin;
    let result = 0;
    ranges.forEach(range => {
      if (diff <= 0) {
        return;
      }
      const rangeCounterMin = range.counterMin;
      const rangeCounterMax = range.counterMax;
      const rangeRate       = range.rate;
      const targetDiff      = Math.min(rangeCounterMax - rangeCounterMin, diff);
      const preResult       = (rangeRate * targetDiff).toFixed(2);

      result += toNumber(preResult);
      diff   -= toNumber(targetDiff);
    });

    calculation.calcResult = result;
    calculation.paymentSum = result;
    calculation.error      = null;
  }

  validateAll(calculationList) {
    const errors = [];

    calculationList.forEach(calculation => {
      const { selected, calcResult, service } = calculation;
      const { name } = service;

      if (!selected) {
        return;
      }
      if (!calcResult) {
        errors.push({
          message: NOTIFICATION_ERRORS.calculationNotCalculated,
          info: name,
        });
      }
    });

    return (errors.length > 0) ? errors : null;
  }
}

export default new CalculationFactory();
