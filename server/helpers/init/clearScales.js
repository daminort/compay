const Scale = require('../../models/scale');
const { ERRORS } = require('../../constants/errors');

async function clearScales() {

  try {
    await Scale.find().remove();
    console.log('Scales have been deleted');

  } catch(err) {
    err.info = ERRORS.removeScales;
    throw err;
  };

  return [];
};

module.exports = {
  clearScales,
};
