const fs = require('fs');
const path = require('path');
const DBBackup = require('../models/dbBackup');
const DBRestore = require('../models/dbRestore');
const { ERRORS } = require('../constants/errors');
const { dumpDownloadDirName } = require('../config');
const { initServices } = require('../helpers/init/initServices');
const { initRates } = require('../helpers/init/initRates');
const { initScales } = require('../helpers/init/initScales');
const { clearCalculations } = require('../helpers/init/clearCalculations');
const { clearBackups } = require('../helpers/init/clearBackups');
const { clearRestores } = require('../helpers/init/clearRestores');
const { clearServices } = require('../helpers/init/clearServices');
const { clearScales } = require('../helpers/init/clearScales');
const { clearRates } = require('../helpers/init/clearRates');
const { findBackup, backupDB } = require('../helpers/dbOperations/backupDB');
const { findRestore, restoreDB } = require('../helpers/dbOperations/restoreDB');

async function initDB() {

  try {
    // Backups & Restores -------------------------------------------------------------------------
    await clearBackups();
    await clearRestores();

    // Calculations -------------------------------------------------------------------------------
    await clearCalculations();

    // Service ------------------------------------------------------------------------------------
    await clearServices();
    const serviceList = await initServices();

    // Scales -------------------------------------------------------------------------------------
    await clearScales();
    const scaleList = await initScales();

    // Rates --------------------------------------------------------------------------------------
    await clearRates();
    const rateList = await initRates();

    const result = {
      serviceList,
      scaleList,
      rateList,
    };

    return result;

  } catch(err) {
    throw err;
  }
}

async function startBackupDB() {

  try {
    const backup = new DBBackup();
    await backup.save();
    backupDB(backup.id);

    return {
      id: backup.id,
    };

  } catch(err) {
    err.info = ERRORS.openBackupSession;
    throw err;
  };
}

async function checkBackupDB(backupID) {

  try {
    const backup = await findBackup(backupID);
    return backup;

  } catch(err) {
    err.info = ERRORS.backupNotFound;
    throw err;
  };
}

async function downloadBackupDB(fileName) {

  try {
    const rawData = await fs.readFileSync(path.resolve(dumpDownloadDirName, fileName));
    await fs.unlinkSync(path.resolve(dumpDownloadDirName, fileName));

    return JSON.parse(rawData);

  } catch(err) {
    err.info = ERRORS.backupNotFound;
    throw err;
  };
}

async function uploadStartBackupDB(fileName) {

  try {
    const restore = new DBRestore();
    restore.fileName = fileName;
    await restore.save();
    restoreDB(restore.id);

    return {
      id: restore.id,
    };

  } catch(err) {
    err.info = ERRORS.openRestoreSession;
    throw err;
  };
}

async function checkRestoreDB(restoreID) {

  try {
    const restore = await findRestore(restoreID);
    return restore;

  } catch(err) {
    err.info = ERRORS.restoreNotFound;
    throw err;
  };
}

module.exports = {
  initDB,
  startBackupDB,
  checkBackupDB,
  downloadBackupDB,
  uploadStartBackupDB,
  checkRestoreDB,
};
