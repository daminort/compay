const DBRestore = require('../../models/dbRestore');
const { ERRORS } = require('../../constants/errors');

async function clearRestores() {

  try {
    await DBRestore.find().remove();
    console.log('Restores have been deleted');

  } catch(err) {
    err.info = ERRORS.removeRestores;
    throw err;
  };

  return [];
};

module.exports = {
  clearRestores,
};
