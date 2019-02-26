import dbAPI from '../requests/db';

async function makeResetDB() {

  try {
    const result = await dbAPI.resetDB();
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeStartBackup() {

  try {
    const result = await dbAPI.startBackup();
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeCheckBackup(backupID) {

  try {
    const result = await dbAPI.checkBackup(backupID);
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeDownloadBackup(fileName) {

  try {
    const result = await dbAPI.downloadBackup(fileName);
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeStartRestore(file) {

  try {
    const result = await dbAPI.startRestore(file);
    return result;

  } catch (error) {
    throw error;
  }
}

async function makeCheckRestore(restoreID) {

  try {
    const result = await dbAPI.checkRestore(restoreID);
    return result;

  } catch (error) {
    throw error;
  }
}

export {
  makeResetDB,
  makeStartBackup,
  makeCheckBackup,
  makeDownloadBackup,
  makeStartRestore,
  makeCheckRestore,
};
