import Vue from "vue";
import App from "./App.vue";
import router from './router';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import VeeValidate from 'vee-validate';

require('./assets/app.css')
 
Vue.config.productionTip = false;

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.use(VeeValidate)
Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token : "",
    userId: null,
    username: "Stranger"
  },
  mutations: {
    Login(state,persisted_state){
      state.username = persisted_state.name;
      state.userId = persisted_state.id;
      state.token = persisted_state.tk;
    },
    Logout(state){
      state.username = "Strangers";
      state.userId = null;
      state.token = "";
    }
  }
})

 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");