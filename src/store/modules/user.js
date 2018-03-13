import Cookies from 'js-cookie';
import { loginByName } from '../../api/login';

const user = {
    mutations: {
        login ({ commit }, userInfo) {
            const loginName = userInfo.loginName.trim();
            const password = userInfo.password.trim();
            debugger;
            return new Promise((resolve, reject) => {
                loginByName(loginName, password).then((response) => {
                    const data = response.data;
                    if (response.data.token) {
                        localStorage.setItem('X-TouchSpring-Token', response.data.token);
                        Cookies.set('loginName', response.data.user.loginName);
                        Cookies.set('email', response.data.user.email);
                        Cookies.set('realName', response.data.user.realName);
                        Cookies.set('phone', response.data.user.phone);
                        commit('SET_TOKEN', data.token);
                        commit('SET_BASE_INFO', response.data.user);
                    }
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        logout (state, vm) {
            localStorage.removeItem('X-TouchSpring-Token');
            Cookies.remove('user');
            Cookies.remove('password');
            Cookies.remove('access');
            // 恢复默认样式
            let themeLink = document.querySelector('link[name="theme"]');
            themeLink.setAttribute('href', '');
            // 清空打开的页面等数据，但是保存主题数据
            let theme = '';
            if (localStorage.theme) {
                theme = localStorage.theme;
            }
            localStorage.clear();
            if (theme) {
                localStorage.theme = theme;
            }
        }
    }
};

export default user;
