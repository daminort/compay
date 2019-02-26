const findItem = require('lodash/find');
const isArray = require('lodash/isArray');
const moment = require('moment');
const Calculation = require('../models/calculation');
const Formatter = require('../helpers/Formatter');
const CalulationUtils = require('../helpers/CalulationUtils');
const { mergeModel } = require('../helpers/utils');
const { rollback } = require('../helpers/rollback');
const { ERRORS } = require('../constants/errors');
const { CALCULATION_METHOD } = require('../constants/calculationMethods');
const { validateCalculation, validateCalculationsList } = require('../validators/calculationValidator');
const { list: getRatesList } = require('./rate');

const rawFields = [
  'id',
  'period',
  'createDate',
  'service',
  'rate',
  'deleted',
  'counterMin',
  'counterMax',
  'calcResult',
  'calcResultHint',
  'paymentSum',
  'comment',
  'statusID',
  'info',
];
const calcFields = rawFields.join(' ');

// Service ----------------------------------------------------------------------------------------

function createFilteredQuery(filter = {}) {

  const query = Calculation.find();
  if (!filter.showAll) {
    query.where('deleted').equals(false);
  };
  if (filter.id) {
    query.where('_id').equals(filter.id);
  };
  if (filter.serviceID) {
    query.where('service').equals(filter.serviceID);
  };
  if (filter.rateID) {
    query.where('rate').equals(filter.rateID);
  };
  if (filter.period) {
    const filterDate = new Date(filter.period);
    query.where('period').equals(filterDate);
  };
  if (filter.IDs) {
    query.in('_id', filter.IDs);
  };

  return query;
}

async function findById(id, withPopulate = false) {

  let calc = null;
  try {
    calc = await Calculation.findById(id).exec();
  } catch(err) {
    err.info = ERRORS.getCalculation;
    throw err;
  };
  if (!calc) {
    err = new Error;
    err.info = ERRORS.calculationNotFound;
    throw err;
  };
  if (withPopulate) {
    calc = await populateCalculation(calc);
  }

  return calc;
}

async function populateCalculation(calc) {

  let result = null;
  try {
    result = await calc
      .populate('service')
      .populate('rate')
      .execPopulate();

  } catch(err) {
    throw err;
  };

  return result;
}

// Logic ------------------------------------------------------------------------------------------

async function list(filter = {}) {

  const query = createFilteredQuery(filter);

  query.populate({
    path: 'service',
    model: 'Service',
  })
  .populate({
    path: 'rate',
    model: 'Rate',
    populate: {
      path: 'scale',
      model: 'Scale',
    }
  })
  .sort({
    period: -1,
    createDate: -1,
  })
  .select(calcFields);

  try {
    const calcList = await query.exec();
    return calcList;

  } catch(err) {
    err.info = ERRORS.getCalculationsList;
    throw err;
  };
}

async function remove(id) {

  let calc = null;
  const withPopulate = true;
  try {
    calc = await findById(id, withPopulate);
  } catch(err) {
    throw err;
  };

  calc.deleted = true;
  try {
    await calc.save();
  } catch(err) {
    err.info = ERRORS.removeCalculation;
    throw err;
  };

  // creating new empty Calculation instead of this one
  const counterMin = await getPreviousCounter(calc.period, calc.rate);
  const newCalc    = CalulationUtils.createCalculation(calc.period, calc.rate, counterMin);
  const IDs        = [];
  try {
    const resCalc = await create(newCalc, false);
    IDs.push(resCalc.id);

  } catch(err) {
    try {
      rollback('calculation', IDs);
      throw err;

    } catch(rollErr) {
      throw rollErr;
    };
  }

  return await populateCalculation(calc);
}

async function create(data, validateCalc = true) {

  if (validateCalc) {
    const validateErrors = validateCalculation(data);
    if (validateErrors) {
      const err = new Error;
      err.info = ERRORS.validateCalculation;
      err.messages = validateErrors;
      throw err;
    };
  };

  let calc = new Calculation(data);
  try {
    calc = await calc.save();
  } catch(err) {
    err.info = ERRORS.createCalculation;
    throw err;
  };

  return await populateCalculation(calc);
}

async function createMany(period) {

  const IDs     = [];
  const result  = [];

  let ratesList = [];
  const ratesFilter = {
    forDate: period || Formatter.date(new Date()),
  };
  try {
    ratesList = await getRatesList(ratesFilter);
  } catch(err) {
    throw err;
  }
  if (ratesList.length === 0) {
    const err = new Error;
    err.info = ERRORS.getLatestRate;
    throw err;
  }

  try {
    for (let rate of ratesList) {
      const counterMin = await getPreviousCounter(period, rate);
      const calcData   = CalulationUtils.createCalculation(period, rate, counterMin);
      const calc       = await create(calcData, false);
      IDs.push(calc.id);
      result.push(calc);
    };

  } catch(err) {
    try {
      console.log(err);
      rollback('calculation', IDs);
      throw err;

    } catch(rollErr) {
      throw rollErr;
    };
  }

  return result;
}

async function update(id, data) {

  const validateErrors = validateCalculation(data);
  if (validateErrors) {
    const err = new Error;
    err.info = ERRORS.validateCalculation;
    err.messages = validateErrors;
    throw err;
  };

  let calc = null;
  try {
    calc = await findById(id);
  } catch(err) {
    throw err;
  };

  Object.keys(data).forEach( dataKey => {
    calc[dataKey] = data[dataKey];
  });

  try {
    await calc.save();
  } catch(err) {
    err.info = ERRORS.updateCalculation;
    throw err;
  };

  return await populateCalculation(calc);
}

async function updateStatus(id, statusID) {

  let calc = null;
  try {
    calc = await findById(id);
  } catch(err) {
    throw err;
  };

  calc.statusID = statusID;
  try {
    await calc.save();
  } catch(err) {
    err.info = ERRORS.updateCalculation;
    throw err;
  };

  return await populateCalculation(calc);
}

async function updateStatusMany(IDs, statusID) {

  const result    = [];
  const filter    = { IDs };
  let   calcsList = [];
  try {
    calcsList = await list(filter);

  } catch(err) {
    throw err;
  };

  for (let calc of calcsList) {
    const oldStatusID = calc.statusID;
    calc.statusID = statusID;
    try {
      let updatedCalc = await calc.save();
      updatedCalc = await populateCalculation(updatedCalc);
      result.push(updatedCalc);

    } catch(err) {
      if (calc.statusID !== oldStatusID) {
        calc.statusID = oldStatusID;
        await calc.save();
      };
      throw err;
    }
  };

  return result;
}

async function updateMany(calculationList) {

  const validateErrors = await validateCalculationsList(calculationList);
  if (validateErrors) {
    const err = new Error;
    err.info = ERRORS.validateCalculation;
    err.messages = validateErrors;
    throw err;
  };

  const result    = [];
  const IDs       = calculationList.map(item => item.id);
  const filter    = { IDs };
  let   calcsList = [];
  try {
    calcsList = await list(filter);

  } catch(err) {
    throw err;
  };

  for (let calc of calcsList) {
    const { id } = calc;
    const incomingCalc = findItem(calculationList, { id });
    const resCalc = mergeModel(calc, incomingCalc);
    try {
      let updatedCalc = await resCalc.save();
      updatedCalc = await populateCalculation(updatedCalc);
      result.push(updatedCalc);

    } catch(err) {
      throw err;
    }
  };

  return result;
}

async function getPreviousCounter(currentPeriod, rate) {
  const period     = moment(currentPeriod);
  const lastPeriod = Formatter.date(period.clone().subtract(1, 'month'));
  const { methodID, serviceID } = rate;
  let counterMin = 0;
  if (methodID === CALCULATION_METHOD.counter || methodID === CALCULATION_METHOD.counterScale) {
    const filter = {
      serviceID,
      period: lastPeriod,
    };
    const prevCalc = await list(filter) || null;
    counterMin = (isArray(prevCalc) && prevCalc.length > 0) ? prevCalc[0].counterMax : 0;
  };

  return counterMin;
}

// Exports ----------------------------------------------------------------------------------------

module.exports = {
  list,
  remove,
  create,
  createMany,
  update,
  updateStatus,
  updateStatusMany,
  updateMany,
};
