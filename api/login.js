import QS from 'qs';
import { fetch } from '../libs/fetch';

export function loginByName (loginName, password) {
    const data = {
        loginName,
        password
    };
    return fetch({
        url: '/api/login',
        method: 'post',
        data: QS.stringify(data)
    });
}

export default function login (loginName, password) {
    const data = {
        loginName,
        password
    };
    return fetch({
        url: '/api/login',
        method: 'post',
        params: data
    });
}
