const DBBackup = require('../../models/dbBackup');
const { ERRORS } = require('../../constants/errors');

async function clearBackups() {

  try {
    await DBBackup.find().remove();
    console.log('Backups have been deleted');

  } catch(err) {
    err.info = ERRORS.removeBackups;
    throw err;
  };

  return [];
};

module.exports = {
  clearBackups,
};
