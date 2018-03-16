import Vuex from 'vuex';
import Vue from 'vue';
import user from './modules/user';
import router from './modules/router';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    router,
  },
});
export default store;
