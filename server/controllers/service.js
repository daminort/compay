const Service = require('../models/service');
const { ERRORS } = require('../constants/errors');
const { validateService } = require('../validators/serviceValidator');
const { mergeModel } = require('../helpers/utils');

const serviceFields = 'id name personalAccount icon info deleted account contacts online';

// Service ----------------------------------------------------------------------------------------

async function findById(id) {

  let service = null;
  try {
    service = await Service.findById(id).exec();
  } catch(err) {
    err.info = ERRORS.getService;
    throw err;
  };  
  if (!service) {
    err = new Error;
    err.info = ERRORS.serviceNotFound;
    throw err;
  };

  return service;
}

// Logic ------------------------------------------------------------------------------------------

async function list(filter = {}) {

  const query = Service.find();
  if (!filter.showAll) {
    query.where('deleted').equals(false);
  };
  if (filter.id) {
    query.where('_id').equals(filter.id);
  };
  
  query.sort({ name: 1 })
    .select(serviceFields);

  try {
    const serviceList = await query.exec();
    return serviceList;

  } catch(err) {
    err.info = ERRORS.getServicesList;
    throw err;
  };
};

async function remove(id) {

  let service = null;
  try {
    service = await findById(id);
  } catch(err) {
    throw err;
  };

  service.deleted = true;
  try {
    await service.save();
  } catch(err) {
    err.info = ERRORS.removeService;
    throw err;
  };

  return service;
}

async function restore(id) {

  let service = null;
  try {
    service = await findById(id);
  } catch(err) {
    throw err;
  };

  service.deleted = false;
  try {
    await service.save();
  } catch(err) {
    err.info = ERRORS.restoreService;
    throw err;
  };

  return service;
}

async function update(id, data) {

  const validateErrors = validateService(data);
  if (validateErrors) {
    const err = new Error;
    err.info = ERRORS.validateService;
    err.messages = validateErrors;
    throw err;
  };

  let service = null;
  try {
    service = await findById(id);
  } catch(err) {
    throw err;
  };

  service = mergeModel(service, data);
  try {
    await service.save();
  } catch(err) {
    err.info = ERRORS.updateService;
    throw err;
  };

  return service;
}

async function info(id) {

  let service = null;
  try {
    service = await findById(id);
  } catch(err) {
    throw err;
  };

  return service;
};

// Exports ----------------------------------------------------------------------------------------

module.exports = {
  findById,
  list,
  remove,
  restore,
  update,
  info,
};
