import axios from 'axios';
import store from '../store';
import { appRouter } from '../router/router';

export default function defaultFetch (options) {
}

export function fetch (options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            timeout: 20000, // 超时
            headers: {
                'X-touchspring-Token': store.state.user.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        instance(options).then((response) => {
            const res = response.data;
            // 1200请求成功，2000返回后作为特殊处理
            if (res.code === 1200 || res.code === 2000) {
                resolve(res);
            } else if (res.code === 14020) {
                this.$Message.error(res.message);
            } else {
                this.$Message.error(res.message);
            }
        }).catch((error) => {
            const response = error.response.data;
            if (response.code === 14033) {
                this.$Message.error('请重新登录!');
                appRouter.push({ path: '/' });
            } else if (response.code === 1500) {
                this.$Message.error('服务器错误');
            } else if (response.code === 1403) {
                this.$Message.error('没有权限');
            } else if (response.code === 14101) {
                this.$Message.error('没有权限');
            } else if (response.code === 14102) {
                this.$Message.error('填写信息有误，请重新填写');
                appRouter.push({ path: '/changePassword' });
            } else if (response.code === 14020) {
                this.$Message.error(response.message);
            } else {
                this.$Message.error(response.message);
            }
        });
    });
}
