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
export function departmentList(query) {
  return fetch({
    url: '/api/department',
    method: 'get',
    params: query,
  });
}

export function saveDepartment(department) {
  return fetch({
    url: '/api/department',
    method: 'post',
    params: department,
  });
}

export function getDepartment(id) {
  return fetch({
    url: `/api/department/${id}`,
    method: 'get',
  });
}

export function deleteDepartment(id) {
  return fetch({
    url: `/api/department/${id}`,
    method: 'delete',
  });
}

export function updateDepartment(department) {
  return fetch({
    url: '/api/department',
    method: 'put',
    params: department,
  });
}

