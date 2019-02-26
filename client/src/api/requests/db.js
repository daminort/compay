import { apiRequest } from './index';

function resetDB() {

  const req = {
    method: 'GET',
    url: '/db/init',
  };

  return apiRequest(req);
}

function startBackup() {

  const req = {
    method: 'GET',
    url: '/db/startBackup',
  };

  return apiRequest(req);
}

function checkBackup(backupID) {

  const req = {
    method: 'GET',
    url: `/db/checkBackup/${backupID}`,
  };

  return apiRequest(req);
}

function downloadBackup(fileName) {

  const req = {
    method: 'GET',
    url: `/db/downloadBackup/${fileName}`,
  };

  return apiRequest(req);
}

function startRestore(file) {

  const formData = new FormData();
  formData.append('dump', file);

  const req = {
    method: 'POST',
    url: '/db/startRestore',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  };

  return apiRequest(req);
}

function checkRestore(restoreID) {

  const req = {
    method: 'GET',
    url: `/db/checkRestore/${restoreID}`,
  };

  return apiRequest(req);
}

const dbAPI = {
  resetDB,
  startBackup,
  checkBackup,
  downloadBackup,
  startRestore,
  checkRestore,
};

export default dbAPI;
