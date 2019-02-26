import ratesAPI from '../requests/rates';

async function getRatesList(params = {}) {

  try {
    const result = await ratesAPI.ratesList(params);
    return result;

  } catch (error) {
    throw error;
  }
}

async function getRateInfo(id, params = {}) {

  try {
    const result = await ratesAPI.rateInfo(id, params);
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeRateRemove(id, params = {}) {

  try {
    const result = await ratesAPI.rateRemove(id, params);
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeRateRestore(id, params = {}) {

  try {
    const result = await ratesAPI.rateRestore(id, params);
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeRateCreate(data, params = {}) {

  try {
    const result = await ratesAPI.rateCreate(data, params);
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeRateUpdate(id, data, params = {}) {

  try {
    const result = await ratesAPI.rateUpdate(id, data, params);
    return result;

  } catch (error) {
    throw error;
  }
}

export {
  getRatesList,
  getRateInfo,
  makeRateRemove,
  makeRateRestore,
  makeRateCreate,
  makeRateUpdate,
};
