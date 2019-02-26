import { apiRequest } from './index';

function servicesList(params = {}) {

  const req = {
    method: 'GET',
    url: '/service/list',
    params,
  };

  return apiRequest(req);
}

function servicesInfo(id, params = {}) {

  const req = {
    method: 'GET',
    url: `/service/info/${id}`,
    params,
  };

  return apiRequest(req);
}

function serviceRemove(id, params = {}) {

  const req = {
    method: 'POST',
    url: '/service/remove',
    data: {
      id,
    },
    params,
  };

  return apiRequest(req);
}

function serviceRestore(id, params = {}) {

  const req = {
    method: 'POST',
    url: '/service/restore',
    data: {
      id,
    },
    params,
  };

  return apiRequest(req);
}

function serviceUpdate(id, data, params = {}) {

  const req = {
    method: 'POST',
    url: `/service/update/${id}`,
    data,
    params,
  };

  return apiRequest(req);
}

const servicesAPI = {
  servicesList,
  servicesInfo,
  serviceRemove,
  serviceRestore,
  serviceUpdate,
};

export default servicesAPI;
