import fetchUtil from '../libs/fetch';

let login = {

};

login.loginByName = function (loginName, password) {
    const data = {
        loginName,
        password
    };
    return fetchUtil.fetch({
        url: '/api/login',
        method: 'post',
        params: data
    });
};

export default login;
