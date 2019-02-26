const { cloneDeep, find, maxBy, isArray, unset } = require('lodash');

function safeMerge(target, source) {

  const targetKeys = Object.keys(target);
  const sourceKeys = Object.keys(source);

  targetKeys.forEach( targetKey => {
    if (!sourceKeys.includes(targetKey)) {
      return;
    };
    target[targetKey] = cloneDeep(source[targetKey]);
  });

  return target;
};

function mergeModel(modelInstance, incomingData) {

  const instanceJS = modelInstance.toObject({ depopulate: true });

  const targetKeys = Object.keys(instanceJS);
  const sourceKeys = Object.keys(incomingData);

  targetKeys.forEach( targetKey => {
    if (!sourceKeys.includes(targetKey)) {
      return;
    };
    modelInstance[targetKey] = cloneDeep(incomingData[targetKey]);
  });

  return modelInstance;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  safeMerge,
  mergeModel,
  sleep,
};
