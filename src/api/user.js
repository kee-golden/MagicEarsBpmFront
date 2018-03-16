import QS from 'qs';

import { fetch } from '../utils/fetch';

/**
 *  listQuery: {
            page: 1,
            limit: 20,
            role: '',
            uid: undefined,
            display_name: ''
          },
 * @param query
 * @returns {*}
 */
export function userList(query) {
  return fetch({
    url: '/api/user',
    method: 'get',
    params: query,
  });
}


export function getUser(id) {
  return fetch({
    url: `/api/user/${id}`,
    method: 'get',
  });
}

export function saveUser(user) {
  const stringify = QS.stringify(user, { arrayFormat: 'repeat' });
  return fetch({
    url: '/api/user',
    method: 'post',
    data: stringify,
  });
}

export function saveUserSelf(user) {
  const stringify = QS.stringify(user, { arrayFormat: 'repeat' });
  return fetch({
    url: '/api/user/self',
    method: 'put',
    data: stringify,
  });
}

export function updateUser(user) {
  const stringify = QS.stringify(user, { arrayFormat: 'repeat' });
  return fetch({
    url: `/api/user/${user.id}`,
    method: 'put',
    data: stringify,
  });
}


export function deleteUser(id) {
  return fetch({
    url: `/api/user/${id}`,
    method: 'delete',
  });
}

export function showUserQR(id) {
  return fetch({
    url: `/api/user/show-qr/${id}`,
    method: 'get',
  });
}


export function userRoles(id) {
  return fetch({
    url: `/api/user/${id}/roles`,
    method: 'get',
  });
}

export function userOrganizations(id) {
  return fetch({
    url: `/api/user/${id}/organizations`,
    method: 'get',
  });
}

export function userFleets(id) {
  return fetch({
    url: `/api/user/${id}/fleets`,
    method: 'get',
  });
}


export function updateOrganizations(user) {
  const stringify = QS.stringify(user, { arrayFormat: 'repeat' });
  return fetch({
    url: `/api/user/${user.id}/organizations`,
    method: 'put',
    data: stringify,
  });
}

export function updateFleets(user) {
  const stringify = QS.stringify(user, { arrayFormat: 'repeat' });
  return fetch({
    url: `/api/user/${user.id}/fleets`,
    method: 'put',
    data: stringify,
  });
}


export function userPrivileges(user) {
  return fetch({
    url: '/api/user/privileges',
    method: 'get',
  });
}

export function userMenus(user) {
  return fetch({
    url: '/api/user/menus',
    method: 'get',
  });
}

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
