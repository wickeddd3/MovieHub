import Vue from 'vue';
import VueRouter from 'vue-router';
import appRoutes from './routes';

Vue.use(VueRouter);

const routes = appRoutes;

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
