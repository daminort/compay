const Calculation = require('../../models/calculation');
const { ERRORS } = require('../../constants/errors');

async function clearCalculations() {

  try {
    await Calculation.find().remove();
    console.log('Calculations have been deleted');

  } catch(err) {
    err.info = ERRORS.removeCalcs;
    throw err;
  };

  return [];
};

module.exports = {
  clearCalculations,
};
