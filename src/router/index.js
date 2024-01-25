import { createRouter, createWebHistory } from 'vue-router'

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.ifNotAuthenticated){
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if(store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: function() {
      return import('../views/HomeView.vue');
    },
    beforeEnter: isAuthenticated,
  },
  {
    path:'/login',
    name:'login',
    component: function() {
      return import('../components/Login.vue');
    },
    beforeEnter: ifNotAuthenticated,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
