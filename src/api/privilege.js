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
export function privilegeList(query) {
  return fetch({
    url: '/api/privilege',
    method: 'get',
    params: query,
  });
}


export function getPrivilege(id) {
  return fetch({
    url: `/api/privilege/${id}`,
    method: 'get',
  });
}

export function savePrivilege(privilege) {
  return fetch({
    url: '/api/privilege',
    method: 'post',
    data: QS.stringify(privilege),
  });
}


export function updatePrivilege(privilege) {
  return fetch({
    url: `/api/privilege/${privilege.id}`,
    method: 'put',
    data: QS.stringify(privilege),
  });
}


export function deletePrivilege(id) {
  return fetch({
    url: `/api/privilege/${id}`,
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
