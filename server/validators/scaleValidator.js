const validate = require('validate.js');
const { isArray, isEmpty } = require('lodash');

validate.options = { format: 'flat' };

const scaleConstraints = {
  service: {
    presence: true,
    length: {
      is: 24, // MongoDB _id length
    },
  },
  range: {
    presence: true,
  },
};

const rangeConstrants = {
  counterMin: {
    presence: true,
    numericality: {
      greaterThanOrEqualTo: 0,
    },
  },
  counterMax: function(value, attributes, attributeName, options, constraints) {
    return {
      presence: true,
      numericality: {
        greaterThan: attributes.counterMin,
      },
    };
  },
};

function validateScale(data) {

  let errors = [];
  const scaleErrors = validate(data, scaleConstraints);
  if (isArray(scaleErrors)) {
    errors = errors.concat(scaleErrors);
    return errors;
  };

  const range = data.range;
  if (!isArray(range)) {
    errors = errors.concat('Range should be an Array');
    return errors;
  };

  range.forEach( item => {
    const rangeErrors = validate(item, rangeConstrants);
    if (isArray(rangeErrors)) {
      errors = errors.concat(rangeErrors);
    };
  });

  return (!isEmpty(errors)) ? errors : null;
};

module.exports = {
  validateScale,
}

