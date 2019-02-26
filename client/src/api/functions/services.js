import servicesAPI from '../requests/services';

async function getServicesList(params = {}) {

  try {
    const result = await servicesAPI.servicesList(params);
    return result;

  } catch (error) {
    throw error;
  }
}

async function getServicesInfo(id, params = {}) {

  try {
    const result = await servicesAPI.servicesInfo(id, params);
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeServiceRemove(id, params = {}) {

  try {
    const result = await servicesAPI.serviceRemove(id, params);
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeServiceRestore(id, params = {}) {

  try {
    const result = await servicesAPI.serviceRestore(id, params);
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeServiceUpdate(id, data, params = {}) {

  try {
    const result = await servicesAPI.serviceUpdate(id, data, params);
    return result;

  } catch (error) {
    throw error;
  }
}

export {
  getServicesList,
  getServicesInfo,
  makeServiceRemove,
  makeServiceRestore,
  makeServiceUpdate,
};
