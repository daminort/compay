import { isArray, isEmpty } from 'lodash';
import { NOTIFICATION_ERRORS } from '../constants/notifications';
import { CALCULATION_METHOD } from '../constants/calculationMethods';

function validateRanges(ranges) {

  const errors = [];

  if (!isArray(ranges) || isEmpty(ranges)) {
    errors.push({
      range: 0,
      message: NOTIFICATION_ERRORS.rateRangesIsEmpty,
    });

    return errors;
  }

  const rangesCount = ranges.length;

  for (let i = 0; i < rangesCount; i++) {

    const rangeNumber   = i + 1;
    const currentRange  = ranges[i];

    if (!currentRange.rate) {
      errors.push({
        range   : rangeNumber,
        message : NOTIFICATION_ERRORS.rateRateIsEmpty,
      });
    }
  }

  return errors;
}

export function validateRate(rateItem) {

  let errors = [];
  console.log('rateItem', rateItem);

  // Common
  if (!rateItem.startDate) {
    errors.push({
      dataID: 'startDate',
      message: NOTIFICATION_ERRORS.rateStartDateIsEmpty,
    });
  }
  if (!rateItem.serviceID) {
    errors.push({
      dataID: 'serviceID',
      message: NOTIFICATION_ERRORS.rateServiceIsEmpty,
    });
  }
  if (!rateItem.methodID) {
    errors.push({
      dataID: 'methodID',
      message: NOTIFICATION_ERRORS.rateMethodIsEmpty,
    });
  }

  // In according to selected method
  switch (rateItem.methodID) {

    case CALCULATION_METHOD.fixSum:
    case CALCULATION_METHOD.counter: {
      if (!rateItem.rate) {
        errors.push({
          dataID: 'rate',
          message: NOTIFICATION_ERRORS.rateRateIsEmpty,
        });
      }
      break;
    }
    case CALCULATION_METHOD.formula: {
      if (!rateItem.formulaID) {
        errors.push({
          dataID: 'formulaID',
          message: NOTIFICATION_ERRORS.rateFormulaIsEmpty,
        });
      }
      if (!rateItem.argument) {
        errors.push({
          dataID: 'argument',
          message: NOTIFICATION_ERRORS.rateArgumentIsEmpty,
        });
      }
      if (!rateItem.rate) {
        errors.push({
          dataID: 'rate',
          message: NOTIFICATION_ERRORS.rateRateIsEmpty,
        });
      }
      break;
    }
    case CALCULATION_METHOD.counterScale: {
      if (!rateItem.scaleID) {
        errors.push({
          dataID: 'scaleID',
          message: NOTIFICATION_ERRORS.rateScaleIsEmpty,
        });
      }
      errors = errors.concat( validateRanges(rateItem.ranges) );
      break;
    }
    default:
  }

  return errors;
}
