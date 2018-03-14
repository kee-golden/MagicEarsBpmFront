import Cookies from 'js-cookie';
import { loginByName } from '../../api/login';

const user = {
    mutations: {
        login (userInfo) {
            const userName = userInfo.userName.trim();
            const password = userInfo.password.trim();
            loginByName(userName, password).then((response) => {
                const data = response.data;
                if (response.data.token) {
                    debugger;
                    localStorage.setItem('X-TouchSpring-Token', data.token);
                    Cookies.set('loginName', data.user.loginName);
                    Cookies.set('email', data.user.email);
                    Cookies.set('realName', data.user.realName);
                    Cookies.set('phone', data.user.phone);
                };
            });
        },
        logout (state, vm) {
            localStorage.removeItem('X-TouchSpring-Token');
            Cookies.remove('loginName');
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
