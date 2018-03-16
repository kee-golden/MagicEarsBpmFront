import Cookies from 'js-cookie';
import { loginByName } from '../../api/login';

const user = {
  state: {
    token: localStorage.getItem('X-magicears-Token'),
    baseInfo: {},
    privileges: new Set(),
  },
  getters: {
    organizations: state => state.baseInfo.organizations,
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_BASE_INFO: (state, baseInfo) => {
      state.baseInfo = baseInfo;
    },
  },
  actions: {
    login({ commit }, userInfo) {
      const email = userInfo.loginName.trim();
      return new Promise((resolve, reject) => {
        loginByName(email, userInfo.password).then((response) => {
          const data = response.data;
          if (response.data.token) {
            localStorage.setItem('X-magicears-Token', response.data.token);
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
    logout({ commit }, userInfo) {
      commit('SET_TOKEN', '');
      localStorage.removeItem('X-magicears-Token');
    },
  },
};

export default user;
