import { apiRequest } from './index';

function scalesList(params = {}) {

  const req = {
    method: 'GET',
    url: '/scale/list',
    params,
  };

  return apiRequest(req);
}

function scaleInfo(id, params = {}) {

  const req = {
    method: 'GET',
    url: `/scale/info/${id}`,
    params,
  };

  return apiRequest(req);
}

function scaleRemove(id, params = {}) {

  const req = {
    method: 'POST',
    url: '/scale/remove',
    data: {
      id,
    },
    params,
  };

  return apiRequest(req);
}

function scaleRestore(id, params = {}) {

  const req = {
    method: 'POST',
    url: '/scale/restore',
    data: {
      id,
    },
    params,
  };

  return apiRequest(req);
}

function scaleCreate(data, params = {}) {

  const req = {
    method: 'POST',
    url: '/scale/create',
    data,
    params,
  };

  return apiRequest(req);
}

function scaleUpdate(id, data, params = {}) {

  const req = {
    method: 'POST',
    url: `/scale/update/${id}`,
    data,
    params,
  };

  return apiRequest(req);
}

const scalesAPI = {
  scalesList,
  scaleInfo,
  scaleRemove,
  scaleRestore,
  scaleCreate,
  scaleUpdate,
};

export default scalesAPI;
