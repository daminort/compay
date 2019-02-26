const fs = require('fs');
const path = require('path');
const moment = require('moment');
const DBBackup = require('../../models/dbBackup');
const { ERRORS } = require('../../constants/errors');
const { dumpDownloadDirName } = require('../../config');
const { list: sevicesList } = require('../../controllers/service');
const { list: scalesList } = require('../../controllers/scale');
const { list: ratesList } = require('../../controllers/rate');
const { list: calculationsList } = require('../../controllers/calculation');
const { sleep } = require('../../helpers/utils');

const dumpDir = path.resolve(dumpDownloadDirName);

async function findBackup(id) {

  let backup = null;
  try {
    backup = await DBBackup.findById(id).exec();
  } catch(err) {
    err.info = ERRORS.getBackup;
    throw err;
  };
  if (!backup) {
    err = new Error;
    err.info = ERRORS.backupNotFound;
    throw err;
  };

  return backup;
}

async function backupDB(backupID) {

  const sleepTime  = 0;
  let errorMessage = ERRORS.backupUpdate;
  try {
    let backup = await findBackup(backupID);

    // Services ---------------------------------------------------------------
    const services  = await sevicesList({ showAll: true });
    backup.services = true;
    backup.percent  = 25;
    backup = await backup.save();
    await sleep(sleepTime);

    // Scales -----------------------------------------------------------------
    const scales    = await scalesList({ showAll: true });
    backup.scales   = true;
    backup.percent  = 50;
    backup = await backup.save();
    await sleep(sleepTime);

    // Rates ------------------------------------------------------------------
    const rates     = await ratesList({ showAll: true });
    backup.rates    = true;
    backup.percent  = 75;
    backup = await backup.save();
    await sleep(sleepTime);

    // Calculations -----------------------------------------------------------
    const calculations  = await calculationsList({ showAll: true });
    backup.calculations = true;
    backup.percent      = 100;
    backup = await backup.save();
    await sleep(sleepTime);

    // Saving Result ----------------------------------------------------------
    const result = {
      services,
      scales,
      rates,
      calculations,
    };
    const data = JSON.stringify(result);
    const fileDate = moment(new Date()).toISOString();
    const fileName = fileDate.replace('T', '-')
      .replace(':', '-')
      .replace(':', '-')
      .replace('.', '-') + '.json';

    if (!fs.existsSync(dumpDir)){
      fs.mkdirSync(dumpDir);
    }
    fs.writeFileSync(path.resolve(dumpDownloadDirName, fileName), data, function(err) {
      if (err) {
        console.log(err);
        throw err;
      }
    });

    backup.completed = true;
    backup.date      = new Date();
    backup.fileName  = fileName;
    backup = await backup.save();
    await sleep(sleepTime);

    return backup;

  } catch(err) {
    const backup        = await findBackup(backupID);
    backup.error        = true;
    backup.errorMessage = err.message;
    await backup.save();

    err.info = errorMessage || ERRORS.backupDB;
    throw err;
  };
};

module.exports = {
  findBackup,
  backupDB,
};
