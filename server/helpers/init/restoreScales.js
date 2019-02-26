const Scale = require('../../models/scale');
const { ERRORS } = require('../../constants/errors');
const { list } = require('../../controllers/scale');

async function restoreScales(scales) {

  try {
    for (let i = 0; i < scales.length; i++) {
      const item = scales[i];
      const newScale = new Scale(item);

      newScale._id     = item.id;
      newScale.service = item.serviceID;

      await newScale.save();
    };
    const scaleList = await list();
    console.log('Scales have been restored');

    return scaleList;

  } catch(err) {
    err.info = ERRORS.restoreScales;
    throw err;
  };
};

module.exports = {
  restoreScales,
};
