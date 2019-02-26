const Service     = require('../models/service');
const Scale       = require('../models/scale');
const Rate        = require('../models/rate');
const Calculation = require('../models/calculation');
const { ERRORS }  = require('../constants/errors');

async function rollback(modelName, IDs) {

  let Model = getModel(modelName);
  if (!Model) {
    const err = new Error;
    err.info = ERRORS.unknownModel;
    throw err;
  };

  const query = Model
    .in(IDs)
    .deleteMany();

  try {
    await query.exec();

  } catch(err) {
    err.info = ERRORS.rollbackFailed;
    throw err;
  };
}

function getModel(modelName) {

  switch(modelName) {
    case 'service':
      return Service;

    case 'scale':
      return Scale;

    case 'rate':
      return Rate;

    case 'calculation':
      return Calculation;

    default:
      return null;
  }
}

module.exports = {
  rollback,
}
