import { apiRequest } from './index';

function ratesList(params = {}) {

  const req = {
    method: 'GET',
    url: '/rate/list',
    params,
  };

  return apiRequest(req);
}

function rateInfo(id, params = {}) {

  const req = {
    method: 'GET',
    url: `/rate/info/${id}`,
    params,
  };

  return apiRequest(req);
}

function rateRemove(id, params = {}) {

  const req = {
    method: 'POST',
    url: '/rate/remove',
    data: {
      id,
    },
    params,
  };

  return apiRequest(req);
}

function rateRestore(id, params = {}) {

  const req = {
    method: 'POST',
    url: '/rate/restore',
    data: {
      id,
    },
    params,
  };

  return apiRequest(req);
}

function rateCreate(data, params = {}) {

  const req = {
    method: 'POST',
    url: '/rate/create',
    data,
    params,
  };

  return apiRequest(req);
}

function rateUpdate(id, data, params = {}) {

  const req = {
    method: 'POST',
    url: `/rate/update/${id}`,
    data,
    params,
  };

  return apiRequest(req);
}

const ratesAPI = {
  ratesList,
  rateInfo,
  rateRemove,
  rateRestore,
  rateCreate,
  rateUpdate,
};

export default ratesAPI;
