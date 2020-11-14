import Vue from 'vue';
import App from './app/App.vue';
import router from './app/router';

import '@/app/scss/main.scss';

Vue.config.productionTip = false;

import { moviedbApi } from './api';
Vue.prototype.$movie = moviedbApi;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
