const validate = require('validate.js');
const moment = require('moment');
const { isArray, isEmpty } = require('lodash');
const { FORMATS } = require('../constants/formats');
const { CALCULATION_METHOD } = require('../constants/calculationMethods');

validate.options = { format: 'flat' };

// Before using it we must add the parse and format functions
// Here is a sample implementation using moment.js
validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it could be anything.
  parse: function(value, options) {
    const timestamp = moment(value, FORMATS.date).valueOf();
    return timestamp;
  },
  // Input is a unix timestamp
  format: function(value, options) {
    const formattedDate = moment(value).format(FORMATS.date);
    return formattedDate;
  }
});

const rateConstraints = {
  startDate: {
    presence: true,
    datetime: {
      dateOnly: false,
    },
  },
  methodID: {
    presence: true,
    numericality: {
      onlyInteger: true,
      message: 'Method ID is invalid. Must be 1...5',
    },
  },
  service: {
    presence: true,
    length: {
      is: 24, // MongoDB _id length
    },
  },
  rate: function(value, attributes, attributeName, options, constraints) {
    if (
      attributes.methodID !== CALCULATION_METHOD.manual &&
      attributes.methodID !== CALCULATION_METHOD.counterScale
    ) {
      return {
        presence: true,
        numericality: {
          greaterThan: 0,
        },
      };
    };

    return null;
  },
  formulaID: function(value, attributes, attributeName, options, constraints) {
    if (attributes.methodID === CALCULATION_METHOD.formula) {
      return {
        presence: true,
        numericality: {
          greaterThan: 0,
        },
      };
    };

    return null;
  },
  argument: function(value, attributes, attributeName, options, constraints) {
    if (attributes.methodID === CALCULATION_METHOD.formula) {
      return {
        presence: true,
        numericality: {
          greaterThan: 0,
        },
      };
    };

    return null;
  },
  scale: function(value, attributes, attributeName, options, constraints) {
    if (attributes.methodID === CALCULATION_METHOD.counterScale) {
      return {
        presence: true,
        length: {
          is: 24, // MongoDB _id length
        },
      };
    };

    return null;
  },
};

function validateRate(data) {

  let errors = [];
  const rateErrors = validate(data, rateConstraints);
  if (isArray(rateErrors)) {
    errors = errors.concat(rateErrors);
    return errors;
  };

  return (!isEmpty(errors)) ? errors : null;
};

module.exports = {
  validateRate,
}

