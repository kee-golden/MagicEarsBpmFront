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
export function upload(file) {
  return fetch({
    url: '/api/file/upload',
    method: 'post',
    params: file,
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

