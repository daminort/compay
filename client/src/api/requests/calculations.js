import { apiRequest } from './index';

function calculationsList(params = {}) {

  const req = {
    method: 'GET',
    url: '/calculation/list',
    params,
  };

  return apiRequest(req);
}

function calculationRemove(id, params = {}) {

  const req = {
    method: 'POST',
    url: '/calculation/remove',
    data: {
      id,
    },
    params,
  };

  return apiRequest(req);
}

function calculationCreate(data, params = {}) {

  const req = {
    method: 'POST',
    url: '/calculation/create',
    data,
    params,
  };

  return apiRequest(req);
}

function calculationCreateMany(period, params = {}) {

  const req = {
    method: 'POST',
    url: '/calculation/createMany',
    data: {
      period,
    },
    params,
  };

  return apiRequest(req);
}

function calculationUpdate(id, data, params = {}) {

  const req = {
    method: 'POST',
    url: `/calculation/update/${id}`,
    data,
    params,
  };

  return apiRequest(req);
}

function calculationUpdateAll(data, params = {}) {

  const req = {
    method: 'POST',
    url: '/calculation/updateMany',
    data,
    params,
  };

  return apiRequest(req);
}

const calculationsAPI = {
  calculationsList,
  calculationRemove,
  calculationCreate,
  calculationCreateMany,
  calculationUpdate,
  calculationUpdateAll,
};

export default calculationsAPI;
