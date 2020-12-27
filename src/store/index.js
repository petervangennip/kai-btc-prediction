import { createStore } from 'vuex';
import Data from './../state/state.json';

export default createStore({
  state: {
    appData: Data
  },
  mutations: {},
  actions: {},
  modules: {}
});
