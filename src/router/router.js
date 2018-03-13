import Main from '@/views/Main.vue';
import Login from '@/views/login.vue';
import error404 from '@/views/error-page/404.vue';
import error403 from '@/views/error-page/403.vue';
import error500 from '@/views/error-page/500.vue';
import Locking from '@/views/main-components/lockscreen/components/locking-page.vue';
import home from '@/views/home/home.vue';
import ownSpace from '@/views/own-space/own-space.vue';
import message from '@/views/message/message.vue';
import access from '@/views/access/access.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: Login
};

export const page404 = {
    path: '/404',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: error404
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: error403
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: error500
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: Locking
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: home },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: ownSpace },
        { path: 'message', title: '消息中心', name: 'message_index', component: message }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/access',
        icon: 'key',
        name: 'access',
        title: '权限管理',
        component: Main,
        children: [
            { path: 'index', title: '权限管理', name: 'access_index', component: access },
        ]
    },
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    page500,
    page403,
    page404,
    otherRouter,
    locking,
    ...appRouter,
];
