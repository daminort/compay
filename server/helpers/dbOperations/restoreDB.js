const fs = require('fs');
const path = require('path');
const moment = require('moment');
const isArray = require('lodash/isArray');

const DBRestore = require('../../models/dbRestore');
const { ERRORS } = require('../../constants/errors');
const { dumpUploadDirName } = require('../../config');
const { sleep } = require('../../helpers/utils');

const { clearBackups } = require('../../helpers/init/clearBackups');
const { clearCalculations } = require('../../helpers/init/clearCalculations');
const { clearRates } = require('../../helpers/init/clearRates');
const { clearScales } = require('../../helpers/init/clearScales');
const { clearServices } = require('../../helpers/init/clearServices');

const { restoreServices } = require('../../helpers/init/restoreServices');
const { restoreScales } = require('../../helpers/init/restoreScales');
const { restoreRates } = require('../../helpers/init/restoreRates');
const { restoreCalculations } = require('../../helpers/init/restoreCalculations');

const sleepTime = 0;

async function findRestore(id) {

  let restore = null;
  try {
    restore = await DBRestore.findById(id).exec();
  } catch(err) {
    err.info = ERRORS.getRestore;
    throw err;
  };
  if (!restore) {
    err = new Error;
    err.info = ERRORS.restoreNotFound;
    throw err;
  };

  return restore;
}

async function restoreDB(restoreID) {

  let errorMessage = ERRORS.restoreUpdate;
  try {
    let restore = await findRestore(restoreID);
    const { fileName } = restore;

    // Clear DB ---------------------------------------------------------------
    await clearBackups();
    await clearCalculations();
    await clearRates();
    await clearScales();
    await clearServices();

    restore.clearDB = true;
    restore.percent  = 20;
    restore = await restore.save();
    await sleep(sleepTime);

    // Reading file -----------------------------------------------------------
    let backupData = {};
    const rawData = await fs.readFileSync(
      path.resolve(dumpUploadDirName, fileName),
      function(err) {
        if (err) {
          console.log(err);
          throw err;
        }
    });

    try {
      backupData = await JSON.parse(rawData);
    } catch (err) {
      throw err;
    }

    // Services ---------------------------------------------------------------
    if (isArray(backupData.services)) {
      await restoreServices(backupData.services);
    }
    restore.services = true;
    restore.percent  = 40;
    restore = await restore.save();
    await sleep(sleepTime);

    // Scales -----------------------------------------------------------------
    if (isArray(backupData.scales)) {
      await restoreScales(backupData.scales);
    }
    restore.scales  = true;
    restore.percent = 60;
    restore = await restore.save();
    await sleep(sleepTime);

    // Rates ------------------------------------------------------------------
    if (isArray(backupData.rates)) {
      await restoreRates(backupData.rates);
    }
    restore.rates   = true;
    restore.percent = 80;
    restore = await restore.save();
    await sleep(sleepTime);

    // Calculations -----------------------------------------------------------
    if (isArray(backupData.calculations)) {
      await restoreCalculations(backupData.calculations);
    }
    restore.calculations = true;
    restore.percent      = 100;
    restore = await restore.save();
    await sleep(sleepTime);

    // Deleting source file
    await fs.unlinkSync(path.resolve(dumpUploadDirName, fileName));

    // Finish -----------------------------------------------------------------
    restore.completed = true;
    restore.date      = new Date();
    restore = await restore.save();
    await sleep(sleepTime);

    return restore;

  } catch(err) {
    const restore        = await findRestore(restoreID);
    restore.error        = true;
    restore.errorMessage = err.message;
    await restore.save();

    err.info = errorMessage || ERRORS.restoreDB;
    throw err;
  };
};

module.exports = {
  findRestore,
  restoreDB,
};
