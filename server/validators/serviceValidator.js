const validate = require('validate.js');
const { isArray, isEmpty } = require('lodash');

validate.options = { format: 'flat' };

const serviceConstraints = {
  name: {
    presence: true,
    length: {
      maximum: 50,
    },
  },
  icon: {
    presence: true,
  },
};

function validateService(data) {

  let errors = [];
  const serviceErrors = validate(data, serviceConstraints);
  if (isArray(serviceErrors)) {
    errors = errors.concat(serviceErrors);
    return errors;
  };

  return (!isEmpty(errors)) ? errors : null;
};

module.exports = {
  validateService,
}

