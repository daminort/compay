import { find, compact } from 'lodash';
import { isEmptyArray } from './commonUtils';

export function sortServices(servicesList = [], serviceOrder = []) {
  if (isEmptyArray(serviceOrder)) {
    return servicesList;
  }

  const result = serviceOrder.map(id => {
    return find(servicesList, { id }) || null;
  });

  return compact(result);
}

export function sortRates(ratesList = [], serviceOrder = []) {
  if (isEmptyArray(serviceOrder)) {
    return ratesList;
  }

  const result = serviceOrder.map(serviceID => {
    return find(ratesList, { serviceID }) || null;
  });

  return compact(result);
}

export function sortCalculations(calculationsList = [], serviceOrder = []) {
  if (isEmptyArray(serviceOrder)) {
    return calculationsList;
  }

  const result = serviceOrder.map(serviceID => {
    return find(calculationsList, { serviceID }) || null;
  });

  return compact(result);
}
