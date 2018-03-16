// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';

import Vue from 'vue';


import ElementUI from 'element-ui';

import VueI18n from 'vue-i18n';
// import Cookies from 'js-cookie';
import locale from 'element-ui/lib/locale/lang/en';

import 'element-ui/lib/theme-default/index.css';

import App from './App';
import { messages } from './i18n/index';
import router from './router';
import store from './store';
import '../theme/index.css';
import '../src/styles/index.scss';
import '../src/styles/icon.less';


const echarts = () => import('echarts');

echarts().then((x) => {
  Vue.prototype.$echarts = x;
});


Vue.use(ElementUI, { locale });
Vue.use(VueI18n);

const locate = 'zh';


Vue.config.productionTip = false;


const i18n = new VueI18n({
  locale: locate, // set locale
  messages: messages, // set locale messages
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  i18n: i18n,
  render: h => h(App),
  template: '<App/>',
  components: { App },
});

