import axios from 'axios';
import { API_PATH } from '../../config';

export function apiRequest(req) {

  const url = API_PATH + req.url;

  if (!req.headers) {
    req.headers = {};
  }

  req.headers['Content-Type'] = 'application/json';

  if (!req.params) {
    req.params = {};
  }
  if (!req.data) {
    req.data = {};
  }

  const axiosData = {
    url,
    method  : req.method,
    headers : req.headers,
    params  : req.params,
    data    : req.data,
  };

  const axiosRequest = axios(axiosData)
    .then( response => {
      const { status, data } = response.data;
      if (!status || status.toUpperCase() === 'ERROR') {
        const { message } = data;
        const error = new Error(message);
        throw error;
      }

      return data;
    })
    .catch( error => {
      throw error;
    });

  return axiosRequest;
}
