const Scale = require('../../models/scale');
const { maxCounterValue } = require('../../config');
const { ERRORS } = require('../../constants/errors');
const { serviceIDs, scaleID } = require('../../config/initData');
const { list } = require('../../controllers/scale');

async function initScales() {

  try {
    await Scale.find().remove();
    console.log('Scales have been deleted');

  } catch(err) {
    err.info = ERRORS.removeScales;
    throw err;
  };

  try {
    const newScale = new Scale({
      _id: scaleID,
      service: serviceIDs.electric,
      deleted: false,
      range: [
        { counterMin: 0, counterMax: 100 },
        { counterMin: 101, counterMax: maxCounterValue },
      ],
    });
    await newScale.save();
    console.log('Scale have been added');

    const scaleList = await list();

    return scaleList;

  } catch(err) {
    err.info = ERRORS.createScales;
    throw err;
  };
};

module.exports = {
  initScales,
};
