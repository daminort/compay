const Rate = require('../../models/rate');
const { ERRORS } = require('../../constants/errors');
const { list } = require('../../controllers/rate');

async function restoreRates(rates) {

  try {
    for (let i = 0; i < rates.length; i++) {
      const item = rates[i];
      const newRate = new Rate(item);

      newRate._id     = item.id;
      newRate.service = item.serviceID;
      newRate.scale   = item.scaleID;

      await newRate.save();
    };
    const rateList = await list();
    console.log('Rates have been restored');

    return rateList;

  } catch(err) {
    err.info = ERRORS.restoreRates;
    throw err;
  };
};

module.exports = {
  restoreRates,
};
