const Rate = require('../../models/rate');
const moment = require('moment');
const { ERRORS } = require('../../constants/errors');
const { CALCULATION_METHOD } = require('../../constants/calculationMethods');
const { FORMULA } = require('../../constants/formulas');
const { serviceIDs, scaleID } = require('../../config/initData');
const { list, create } = require('../../controllers/rate');
const { findById } = require('../../controllers/scale');

async function initRates() {

  try {
    await Rate.find().remove();
    console.log('Rates have been deleted');

  } catch(err) {
    err.info = ERRORS.removeRates;
    throw err;
  };

  try {
    await createRate(serviceIDs.home,     CALCULATION_METHOD.formula,      6.68, FORMULA.area, 44.9);
    await createRate(serviceIDs.water,    CALCULATION_METHOD.counter,      13.34);
    await createRate(serviceIDs.hot,      CALCULATION_METHOD.manual);
    await createRate(serviceIDs.electric, CALCULATION_METHOD.counterScale, 15, null, null, scaleID);
    await createRate(serviceIDs.gas,      CALCULATION_METHOD.counter,      6.96);
    await createRate(serviceIDs.garbage,  CALCULATION_METHOD.fixSum,       18.72);
    await createRate(serviceIDs.internet, CALCULATION_METHOD.fixSum,       150);
    await createRate(serviceIDs.tv,       CALCULATION_METHOD.fixSum,       50);
    await createRate(serviceIDs.garage,   CALCULATION_METHOD.fixSum,       150);

    const rateList = await list();
    console.log('Rates have been added');

    return rateList;

  } catch(err) {
    err.info = ERRORS.createRate;
    throw err;
  };
};

async function createRate(
  serviceID, methodID, rateSize, formulaID = null, argument = null, scaleID = null) {

  const startDate = moment('2018-01-01').toDate();
  try {
    const newRate = {
      startDate,
      methodID,
      formulaID,
      argument,
      service : serviceID,
      rate    : rateSize,
      scale   : scaleID,
      ranges  : [],
    };

    if (scaleID) {
      const scale = await findById(scaleID);
      newRate.ranges = scale.range.map((range, index) => ({
        counterMin: range.counterMin,
        counterMax: range.counterMax,
        rate: rateSize + (rateSize * index),
      }));
    }

    await create(newRate);

  } catch(err) {
    throw err;
  };
};

module.exports = {
  initRates,
};
