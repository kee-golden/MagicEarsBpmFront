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
export function roleList(query) {
  return fetch({
    url: '/api/role',
    method: 'get',
    params: query,
  });
}

export function getPrivilegeByRole(id) {
  return fetch({
    url: `/api/role/${id}/privilege`,
    method: 'get',
  });
}


export function getRole(id) {
  return fetch({
    url: `/api/role/${id}`,
    method: 'get',
  });
}

export function saveRole(role) {
  const stringify = QS.stringify(role, { arrayFormat: 'repeat' });
  return fetch({
    url: '/api/role',
    method: 'post',
    data: stringify,
  });
}


export function getPrivileges(roleId) {
  return fetch({
    url: `/api/role/${roleId}/privilege`,
    method: 'get',
  });
}


export function getMenus(roleId) {
  return fetch({
    url: `/api/role/${roleId}/menu`,
    method: 'get',
  });
}

export function updateRole(role) {
  const stringify = QS.stringify(role, { arrayFormat: 'repeat' });
  return fetch({
    url: `/api/role/${role.id}`,
    method: 'put',
    data: stringify,
  });
}


export function deleteRole(id) {
  return fetch({
    url: `/api/role/${id}`,
    method: 'delete',
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
