const Service = require('../../models/service');
const { ERRORS } = require('../../constants/errors');
const { services } = require('../../config/initData');
const { list } = require('../../controllers/service');

async function initServices() {

  try {
    await Service.find().remove();
    console.log('Services have been deleted');

  } catch(err) {
    err.info = ERRORS.removeServices;
    throw err;
  };

  try {
    for (let i = 0; i < services.length; i++) {
      const item = services[i];
      const newService = new Service(item);
      await newService.save();
    };
    const serviceList = await list();
    console.log('Services have been added');

    return serviceList;

  } catch(err) {
    err.info = ERRORS.createService;
    throw err;
  };
};

module.exports = {
  initServices,
};
