import scalesAPI from '../requests/scales';

async function getScalesList(params = {}) {

  try {
    const result = await scalesAPI.scalesList(params);
    return result;

  } catch (error) {
    throw error;
  }
}

async function getScaleInfo(id, params = {}) {

  try {
    const result = await scalesAPI.scaleInfo(id, params);
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeScaleRemove(id, params = {}) {

  try {
    const result = await scalesAPI.scaleRemove(id, params);
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeScaleRestore(id, params = {}) {

  try {
    const result = await scalesAPI.scaleRestore(id, params);
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeScaleCreate(data, params = {}) {

  try {
    const result = await scalesAPI.scaleCreate(data, params);
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeScaleUpdate(id, data, params = {}) {

  try {
    const result = await scalesAPI.scaleUpdate(id, data, params);
    return result;

  } catch (error) {
    throw error;
  }
}

export {
  getScalesList,
  getScaleInfo,
  makeScaleRemove,
  makeScaleRestore,
  makeScaleCreate,
  makeScaleUpdate,
};
