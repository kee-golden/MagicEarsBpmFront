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
export function menuList(query) {
  return fetch({
    url: '/api/menu',
    method: 'get',
    params: query,
  });
}


export function getMenu(id) {
  return fetch({
    url: `/api/menu/${id}`,
    method: 'get',
  });
}

export function saveMenu(menu) {
  return fetch({
    url: '/api/menu',
    method: 'post',
    data: QS.stringify(menu),
  });
}


export function updateMenu(menu) {
  console.log(menu);
  return fetch({
    url: `/api/menu/${menu.id}`,
    method: 'put',
    data: QS.stringify(menu),
  });
}


export function deleteMenu(id) {
  return fetch({
    url: `/api/menu/${id}`,
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
