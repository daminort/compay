const Rate = require('../../models/rate');
const { ERRORS } = require('../../constants/errors');

async function clearRates() {

  try {
    await Rate.find().remove();
    console.log('Rates have been deleted');

  } catch(err) {
    err.info = ERRORS.removeRates;
    throw err;
  };

  return [];
};

module.exports = {
  clearRates,
};
