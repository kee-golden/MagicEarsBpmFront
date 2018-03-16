import axios from 'axios';
import { Message } from 'element-ui';
import store from '../store';
import router from '../router';

export default function defaultFetch(options) {
}

export function fetch(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      timeout: 20000, // 超时
      headers: {
        'X-touchspring-Token': store.state.user.token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    instance(options)
      .then((response) => {
        const res = response.data;
        // 1200请求成功，2000返回后作为特殊处理
        if (res.code === 1200 || res.code === 2000) {
          resolve(res);
        } else if (res.code === 14020) {
          Message({
            message: res.message,
            type: 'error',
            showClose: true,
            duration: 0,
          });
        } else {
          Message({
            message: res.message,
            type: 'error',
            showClose: true,
            duration: 2 * 1000,
          });
        }
      })
      .catch((error) => {
        const response = error.response.data;
        if (response.code === 14033) {
          Message({
            message: 'Token expired，please login again !',
            type: 'error',
            duration: 2 * 1000,
          });
          router.push({ path: '/' });
        } else if (response.code === 1500) {
          Message({
            message: 'Serve error! please contact the admin!',
            type: 'error',
            duration: 2 * 1000,
          });
        } else if (response.code === 1403) {
          Message({
            message: 'No privilege!',
            type: 'error',
            duration: 2 * 1000,
          });
        } else if (response.code === 14101) {
          Message({
            message: 'No privilege!',
            type: 'error',
            duration: 2 * 1000,
          });
        } else if (response.code === 14102) {
          Message({
            message: 'Please fill the information.',
            type: 'error',
            duration: 2 * 1000,
          });
          router.push({ path: '/changePassword' });
        } else if (response.code === 14020) {
          Message({
            message: response.message,
            type: 'error',
            showClose: true,
            duration: 0,
          });
        } else {
          Message({
            message: response.message,
            showClose: true,
            type: 'error',
            duration: 2 * 1000,
          });
        }
      });
  });
}
