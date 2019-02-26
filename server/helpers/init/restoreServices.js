const Service = require('../../models/service');
const { ERRORS } = require('../../constants/errors');
const { list } = require('../../controllers/service');

async function restoreServices(services) {

  try {
    for (let i = 0; i < services.length; i++) {
      const item = services[i];
      const newService = new Service(item);
      newService._id = item.id;
      await newService.save();
    };
    const serviceList = await list();
    console.log('Services have been restored');

    return serviceList;

  } catch(err) {
    err.info = ERRORS.restoreServices;
    throw err;
  };
};

module.exports = {
  restoreServices,
};
