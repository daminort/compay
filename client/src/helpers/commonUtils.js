import { cloneDeep, isArray } from 'lodash';

export function safeMerge(target = {}, source = {}) {

  const result = cloneDeep(target);

  try {

    const targetKeys = Object.keys(target);
    const sourceKeys = Object.keys(source);

    targetKeys.forEach(key => {
      if (!sourceKeys.includes(key)) {
        return;
      }
      result[key] = source[key];
    });

    return result;

  } catch (err) {
    console.log('commonUtils.js, safeMerge:', err);
    return target;
  }
}

export function isEmptyArray(list = []) {
  if (!isArray(list)) {
    return true;
  }
  if (list.length === 0) {
    return true;
  }

  return false;
}
