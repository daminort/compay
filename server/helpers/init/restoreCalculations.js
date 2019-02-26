const Calculation = require('../../models/calculation');
const { ERRORS } = require('../../constants/errors');
const { list } = require('../../controllers/calculation');

async function restoreCalculations(calculations) {

  try {
    for (let i = 0; i < calculations.length; i++) {
      const item = calculations[i];
      const newCalc = new Calculation(item);

      newCalc._id     = item.id;
      newCalc.service = item.serviceID;
      newCalc.rate    = item.rateID;

      await newCalc.save();
    };
    const calcList = await list();
    console.log('Calculations have been restored');

    return calcList;

  } catch(err) {
    err.info = ERRORS.restoreCalculations;
    throw err;
  };
};

module.exports = {
  restoreCalculations,
};
