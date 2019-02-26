const { isEmpty, maxBy } = require('lodash');
const Rate = require('../models/rate');
const RateUtils = require('../helpers/RateUtils');
const { ERRORS } = require('../constants/errors');
const { validateRate } = require('../validators/rateValidator');
const serviceController = require('./service');

const rateFields = [
  'id',
  'startDate',
  'service',
  'methodID',
  'formulaID',
  'argument',
  'rate',
  'scale',
  'ranges',
  'deleted',
].join(' ');

// Service ----------------------------------------------------------------------------------------

function createFilteredQuery(filter = {}) {

  const query = Rate.find();
  if (!filter.showAll) {
    query.where('deleted').equals(false);
  };
  if (filter.id) {
    query.where('_id').equals(filter.id);
  };
  if (filter.serviceID) {
    query.where('service').equals(filter.serviceID);
  };
  if (filter.forDate) {
    const filterDate = new Date(filter.forDate);
    query.where('startDate').lte(filterDate);
  };

  return query;
}

async function findById(id) {

  let rate = null;
  try {
    rate = await Rate.findById(id).exec();
  } catch(err) {
    err.info = ERRORS.getRate;
    throw err;
  };
  if (!rate) {
    err = new Error;
    err.info = ERRORS.rateNotFound;
    throw err;
  };

  return rate;
}

async function populateRate(rate) {

  let result = null;
  try {
    result = await rate
      .populate('service')
      .populate('scale')
      .execPopulate();

  } catch(err) {
    throw err;
  };

  return result;
}

// Logic ------------------------------------------------------------------------------------------

async function list(filter = {}) {

  const query = createFilteredQuery(filter);

  query.populate('service')
    .populate('scale')
    .sort({ startDate: -1 })
    .select(rateFields);

  try {
    const ratesList = await query.exec();
    const actualRateList = ratesList.filter(rate => {
      return !rate.service.deleted;
    });
    const result = RateUtils.sliceMaximums(actualRateList);

    return result;

  } catch(err) {
    err.info = ERRORS.getRatesList;
    throw err;
  };
}

async function remove(id) {

  let rate = null;
  try {
    rate = await findById(id);
  } catch(err) {
    throw err;
  };

  rate.deleted = true;
  try {
    await rate.save();
  } catch(err) {
    err.info = ERRORS.removeRate;
    throw err;
  };

  return await populateRate(rate);
}

async function restore(id) {

  let rate = null;
  try {
    rate = await findById(id);
  } catch(err) {
    throw err;
  };

  rate.deleted = false;
  try {
    await rate.save();
  } catch(err) {
    err.info = ERRORS.restoreRate;
    throw err;
  };

  return await populateRate(rate);
}

async function create(data) {

  const validateErrors = validateRate(data);
  if (validateErrors) {
    const err = new Error;
    err.info = ERRORS.validateRate;
    err.messages = validateErrors;
    throw err;
  };

  let rate = new Rate(data);
  try {
    rate = await rate.save();
  } catch(err) {
    err.info = ERRORS.createRate;
    throw err;
  };

  return await populateRate(rate);
}

async function update(id, data) {

  const validateErrors = validateRate(data);
  if (validateErrors) {
    const err = new Error;
    err.info = ERRORS.validateRate;
    err.messages = validateErrors;
    throw err;
  };

  let rate = null;
  try {
    rate = await findById(id);
  } catch(err) {
    throw err;
  };

  Object.keys(data).forEach( dataKey => {
    rate[dataKey] = data[dataKey];
  });

  try {
    await rate.save();
  } catch(err) {
    err.info = ERRORS.updateRate;
    throw err;
  };

  return await populateRate(rate);
}

async function latestRate(serviceID, forDate) {

  const filterDate = new Date(forDate);
  const query = Rate.find()
    .where('deleted').equals(false)
    .where('service').equals(serviceID)
    .where('startDate').lte(filterDate)
    .sort({ startDate: -1 })
    .limit(1)
    .populate('service')
    .populate('scale')
    .select(rateFields);

  try {
    const ratesList = await query.exec();
    return !isEmpty(ratesList) ? ratesList[0] : {};

  } catch(err) {
    err.info = ERRORS.getLatestRate;
    throw err;
  };
}

async function actualRates(forDate) {

  const serviceList = await serviceController.list();
  const ratesList = [];

  for (let service of serviceList) {
    const rate = await latestRate(service.id, forDate);
    if (!isEmpty(rate)) {
      ratesList.push(rate);
    };
  };

  return ratesList;
}

async function info(id) {

  let rate = null;
  try {
    rate = await findById(id);
  } catch(err) {
    throw err;
  };

  return await populateRate(rate);
}

// Exports ----------------------------------------------------------------------------------------

module.exports = {
  list,
  remove,
  restore,
  create,
  update,
  latestRate,
  actualRates,
  info,
};
