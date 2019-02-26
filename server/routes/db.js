const fs = require('fs');
const path = require('path');
const express = require('express');
const router  = express.Router();
const multer  = require('multer');

const { dumpUploadDirName } = require('../config');
const { sendSuccess } = require('../helpers/success');
const { sendError } = require('../helpers/errors');
const {
  initDB,
  startBackupDB,
  checkBackupDB,
  downloadBackupDB,
  uploadStartBackupDB,
  checkRestoreDB,
} = require('../controllers/db');

const uploadDump = multer({ dest: dumpUploadDirName });

// Init -----------------------------------------------------------------------
router.get('/init', async (req, res, next) => {
  try {
    const result = await initDB();
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res);
  };
});

// Backup ---------------------------------------------------------------------
router.get('/startBackup', async (req, res, next) => {
  try {
    const result = await startBackupDB();
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res);
  };
});

router.get('/checkBackup/:backupID', async (req, res, next) => {

  const { backupID } = req.params;
  try {
    const result = await checkBackupDB(backupID);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res);
  };
});

router.get('/downloadBackup/:fileName', async (req, res, next) => {

  const { fileName } = req.params;
  try {
    const result = await downloadBackupDB(fileName);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res);
  };
});

// Restore --------------------------------------------------------------------
router.post('/startRestore', uploadDump.single('dump'), async (req, res, next) => {

  const { file } = req;
  const { filename } = file;
  const uploadedFileName = `${filename}.json`;

  try {
    await fs.renameSync(
      path.resolve(dumpUploadDirName, filename),
      path.resolve(dumpUploadDirName, uploadedFileName)
    );
  } catch (err) {
    sendError(err, res);
  }

  try {
    const result = await uploadStartBackupDB(uploadedFileName);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res);
  };
});

router.get('/checkRestore/:restoreID', async (req, res, next) => {

  const { restoreID } = req.params;
  try {
    const result = await checkRestoreDB(restoreID);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res);
  };
});

module.exports = router;
