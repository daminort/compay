import calculationsAPI from '../requests/calculations';

async function getCalculationsList(params = {}) {

  try {
    const result = await calculationsAPI.calculationsList(params);
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeCalculationRemove(id, params = {}) {

  try {
    const result = await calculationsAPI.calculationRemove(id, params);
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeCalculationCreate(data, params = {}) {

  try {
    const result = await calculationsAPI.calculationCreate(data, params);
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeCalculationCreateMany(period, params = {}) {

  try {
    const result = await calculationsAPI.calculationCreateMany(period, params);
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeCalculationUpdate(id, data, params = {}) {

  try {
    const result = await calculationsAPI.calculationUpdate(id, data, params);
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeCalculationUpdateAll(data, params = {}) {

  try {
    const result = await calculationsAPI.calculationUpdateAll(data, params);
    return result;

  } catch (error) {
    throw error;
  }
}

export {
  getCalculationsList,
  makeCalculationRemove,
  makeCalculationCreate,
  makeCalculationCreateMany,
  makeCalculationUpdate,
  makeCalculationUpdateAll,
};
