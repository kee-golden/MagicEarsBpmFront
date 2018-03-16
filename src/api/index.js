import QS from 'qs';
import { fetch } from '../utils/fetch';

export function getVehicleLocation() {
  return fetch({
    url: '/api/realTimeData/location',
    method: 'get',
  });
}

export function getStatistics() {
  return fetch({
    url: '/api/organization/statistics',
    method: 'get',
  });
}

export function getIndexDrivingTime(chartModel) {
  const stringify = QS.stringify(chartModel);
  return fetch({
    url: '/api/result/index/driving-time',
    method: 'post',
    data: stringify,
  });
}

export function getClassify() {
  return fetch({
    url: '/api/result/index/classify',
    method: 'get',
  });
}

export function getQuantity(organizationId) {
  return fetch({
    url: '/api',
    method: 'get',
    params: organizationId,
  });
}

export function getFleetQuantity(fleetId) {
  return fetch({
    url: '/api/fleet',
    method: 'get',
    params: fleetId,
  });
}

// export function getLocation() {
//   return fetch({
//     url: '/api/real-time/vehicle/location',
//     method: 'get',
//   });
// }


export default function login(loginName, password) {
  const data = {
    loginName,
    password,
  };
  return fetch({
    url: '/api/login',
    method: 'post',
    params: data,
  });
}

