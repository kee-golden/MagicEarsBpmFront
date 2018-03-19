import QS from 'qs';
import { fetch } from '../utils/fetch';

export function loginByName(loginName, password) {
  const data = {
    loginName,
    password,
  };
  return fetch({
    url: '/api/login',
    method: 'post',
    data: QS.stringify(data),
  });
}

export function login1(loginName) {
  return fetch({
    url: 'https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoavuchxgijee1cfmi1' +
    '&response_type=code&scope=' + loginName + '&state=STATE&redirect_uri=http://localhost:8099/#/',
    method: 'post',
  });
}


export function changePassword(data) {
  return fetch({
    url: '/api/password',
    method: 'put',
    data: QS.stringify(data),
  });
}
export function resetPassword(data) {
  return fetch({
    url: '/api/password/reset',
    method: 'put',
    data: QS.stringify(data),
  });
}

export function putPassword(data) {
  return fetch({
    url: '/api/putPassword',
    method: 'put',
    data: QS.stringify(data),
  });
}


export function changeMyPassword(data) {
  return fetch({
    url: '/api/user/password',
    method: 'put',
    data: QS.stringify(data),
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
