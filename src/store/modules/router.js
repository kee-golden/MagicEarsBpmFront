import Cookies from 'js-cookie';

const router = {
  state: {
    currentRouter: Cookies.get('currentRouter'),
  },
  mutations: {
    SET_CURRENT__ROUTER: (state, currentRouter) => {
      state.currentRouter = currentRouter;
    },
  },
  actions: {
    setCurrentRouter({ commit }, currentRouter) {
      Cookies.set('currentRouter', currentRouter);
      commit('SET_CURRENT__ROUTER', currentRouter);
    },
  },
};

export default router;
