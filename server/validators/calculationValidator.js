const validate = require('validate.js');
const { isArray, isEmpty } = require('lodash');

validate.options = { format: 'flat' };

const calculationConstraints = {
  counterMin: {
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: 0,
    },
  },
  counterMax: function(value, attributes, attributeName, options, constraints) {
    if (attributes.counterMin > 0) {
      return {
        numericality: {
          onlyInteger: true,
          greaterThan: attributes.counterMin,
        },
      };
    };

    return {
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0,
      },
    };
  },
  calcResult: {
    numericality: {
      greaterThanOrEqualTo: 0,
    },
  },
};

function validateCalculation(data) {

  let errors = [];
  const calcErrors = validate(data, calculationConstraints);
  if (isArray(calcErrors)) {
    errors = errors.concat(calcErrors);
    return errors;
  };

  return (!isEmpty(errors)) ? errors : null;
};

function validateCalculationsList(dataList) {

  let errors = [];
  if (!isArray(dataList)) {
    errors.push(`Data list for validation is not an array. Type: ${typeof dataList}`);
    return errors;
  };

  for (let i = 0; i < dataList.length; i++) {
    const data = dataList[i];
    const calcErrors = validateCalculation(data);
    if (isArray(calcErrors)) {
      const adaptedErrors = calcErrors.map( error => `Item ${i}: ${error}`);
      errors = errors.concat(adaptedErrors);
    };
  };

  return (!isEmpty(errors)) ? errors : null;
}

module.exports = {
  validateCalculation,
  validateCalculationsList,
}
