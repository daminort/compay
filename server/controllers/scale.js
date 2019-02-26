const Scale = require('../models/scale');
const { ERRORS } = require('../constants/errors');
const { validateScale } = require('../validators/scaleValidator');

const scaleFields = 'id service serviceID range name deleted';

// Service ----------------------------------------------------------------------------------------

async function findById(id) {

  let scale = null;
  try {
    scale = await Scale.findById(id).exec();
  } catch(err) {
    err.info = ERRORS.getScale;
    throw err;
  };  
  if (!scale) {
    err = new Error;
    err.info = ERRORS.scaleNotFound;
    throw err;
  };

  return scale;
}

async function populateScale(scale) {

  let result = null;
  try {
    result = await scale
      .populate('service')
      .execPopulate();

  } catch(err) {
    throw err;
  };

  return result;
}

// Logic ------------------------------------------------------------------------------------------

async function list(filter = {}) {

  const query = Scale.find();
  if (!filter.showAll) {
    query.where('deleted').equals(false);
  };
  if (filter.id) {
    query.where('_id').equals(filter.id);
  };
  if (filter.serviceID) {
    query.where('service').equals(filter.serviceID);
  };

  query.populate('service');
  query.select(scaleFields);

  try {
    const scalesList = await query.exec();
    return scalesList;

  } catch(err) {
    err.info = ERRORS.getScalesList;
    throw err;
  };
}

async function remove(id) {

  let scale = null;
  try {
    scale = await findById(id);
  } catch(err) {
    throw err;
  };

  scale.deleted = true;
  try {
    await scale.save();
  } catch(err) {
    err.info = ERRORS.removeScale;
    throw err;
  };

  return await populateScale(scale);
}

async function restore(id) {

  let scale = null;
  try {
    scale = await findById(id);
  } catch(err) {
    throw err;
  };

  scale.deleted = false;
  try {
    await scale.save();
  } catch(err) {
    err.info = ERRORS.restoreScale;
    throw err;
  };

  return await populateScale(scale);
}

async function create(data) {

  const validateErrors = validateScale(data);
  if (validateErrors) {
    const err = new Error;
    err.info = ERRORS.validateScale;
    err.messages = validateErrors;
    throw err;
  };

  const scale = new Scale(data);
  try {
    await scale.save();
  } catch(err) {
    err.info = ERRORS.createScale;
    throw err;
  };

  return await populateScale(scale);
}

async function update(id, data) {

  const validateErrors = validateScale(data);
  if (validateErrors) {
    const err = new Error;
    err.info = ERRORS.validateScale;
    err.messages = validateErrors;
    throw err;
  };

  let scale = null;
  try {
    scale = await findById(id);
  } catch(err) {
    throw err;
  };

  scale.range   = data.range;
  scale.service = data.service;
  try {
    await scale.save();
  } catch(err) {
    err.info = ERRORS.updateScale;
    throw err;
  };

  return await populateScale(scale);
}

async function info(id) {

  let scale = null;
  try {
    scale = await findById(id);
  } catch(err) {
    throw err;
  };

  return await populateScale(scale);
};

// Exports ----------------------------------------------------------------------------------------

module.exports = {
  findById,
  list,
  remove,
  restore,
  create,
  update,
  info,
};
