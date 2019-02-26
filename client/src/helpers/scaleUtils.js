import { isArray, isEmpty, last, sortBy } from 'lodash';
import { NOTIFICATION_ERRORS } from '../constants/notifications';
import { maxCounterValue } from '../config';

export function validateRange(range) {

  const errors = [];

  // Empty ranges
  if (!isArray(range) || isEmpty(range)) {
    errors.push({
      range: 0,
      message: NOTIFICATION_ERRORS.scaleRangeIsEmpty,
    });

    return errors;
  }

  const rangesCount = range.length;

  // One range
  if (rangesCount === 1) {
    errors.push({
      range: 1,
      message: NOTIFICATION_ERRORS.scaleRangeIsSingle,
    });

    return errors;
  }

  const firstRange = range[0];
  const lastRange  = last(range);

  // First must be empty
  if (firstRange.counterMin !== 0) {
    errors.push({
      range: 1,
      message: NOTIFICATION_ERRORS.scaleRangeFirstMustBeEmpty,
    });
  }

  // Last must be empty
  if (lastRange.counterMax !== 0 && lastRange.counterMax !== maxCounterValue) {
    errors.push({
      range: rangesCount,
      message: NOTIFICATION_ERRORS.scaleRangeLastMustBeEmpty,
    });
  }

  for (let i = 0; i < rangesCount; i++) {

    const rangeNumber   = i + 1;
    const currentRange  = range[i];
    const previousRange = range[i - 1];

    // Current: Min / Max / Equal
    if (currentRange.counterMin > currentRange.counterMax) {
      errors.push({
        range: rangeNumber,
        message: NOTIFICATION_ERRORS.scaleRangeMinGreaterMax,
      });
    }
    if (currentRange.counterMin === currentRange.counterMax) {
      errors.push({
        range: rangeNumber,
        message: NOTIFICATION_ERRORS.scaleRangeMinEqualMax,
      });
    }

    // Previous: Min / Max / Equal
    if (previousRange) {
      if (currentRange.counterMin === previousRange.counterMax) {
        errors.push({
          range: rangeNumber,
          message: NOTIFICATION_ERRORS.scaleRangeMinEqualPreviousMax,
        });
      }
      if (currentRange.counterMin < previousRange.counterMax) {
        errors.push({
          range: rangeNumber,
          message: NOTIFICATION_ERRORS.scaleRangeMinLessPreviousMax,
        });
      }
      if (currentRange.counterMin > previousRange.counterMax + 1) {
        errors.push({
          range: rangeNumber,
          message: NOTIFICATION_ERRORS.scaleRangeMinGreaterPreviousMax,
        });
      }
    }
  }

  return sortBy(errors, ['range']);
}
