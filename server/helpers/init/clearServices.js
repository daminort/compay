const Service = require('../../models/service');
const { ERRORS } = require('../../constants/errors');

async function clearServices() {

  try {
    await Service.find().remove();
    console.log('Services have been deleted');

  } catch(err) {
    err.info = ERRORS.removeServices;
    throw err;
  };

  return [];
};

module.exports = {
  clearServices,
};
