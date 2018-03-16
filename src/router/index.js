import Vue from 'vue';
import Router from 'vue-router';

const Index = () => import('@/container/Index');
const LoginDemo = () => import('@/container/LoginDemo');
const Login = () => import('@/container/Login');
const Test = () => import('@/container/Test');
const ChangePassword = () => import('@/container/ChangePassword');
const ForgetPassword = () => import('@/container/ForgetPassword');
const PutPassword = () => import('@/container/PutPassword');
const Dashboard = () => import('@/container/layout/Dashboard');

// user management
const DepartmentList = () => import('@/container/user_management/department/List');
const UserList = () => import('@/container/user_management/user/List');
const RoleList = () => import('@/container/user_management/role/List');
const PrivilegeList = () => import('@/container/user_management/privilege/List');
const MenuList = () => import('@/container/user_management/menu/List');


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '',
      component: Login,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/login-demo',
      component: LoginDemo,
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
    },
    {
      path: '/changePassword/:userName',
      name: 'changePassword',
      component: ChangePassword,
    },
    {
      path: '/putPassword/:token',
      name: 'putPassword',
      component: PutPassword,
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: ForgetPassword,
    },
    {
      path: '',
      component: Dashboard,
      children: [
        {
          path: '/index',
          name: 'IndexIndex',
          component: Index,
        },
      ],
    },
    {
      path: '/system',
      component: Dashboard,
      children: [
        {
          path: 'user/list',
          component: UserList,
        },
        {
          path: 'role/list',
          component: RoleList,
        },
        {
          path: 'menu/list',
          component: MenuList,
        },
        {
          path: 'privilege/list',
          component: PrivilegeList,
        },
        {
          path: 'department/list',
          component: DepartmentList,

        },
      ],
    },

  ],
  beforeRouteUpdate(to, from, next) {
    next();
  },
});
