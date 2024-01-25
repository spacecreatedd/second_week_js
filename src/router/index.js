import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const ifNotAuthenticated = (to,from,next) => {
  if(!store.getters.isAuthenticated){
    next();
    return;
  }
  next('/');
}

const ifAuthenticated = (to,from,next) => {
  if(store.getters.isAuthenticated){
    next();
    return;
  }
  next('/')
}

const routes = [
  { 
    path: '/',
    name: 'home',
    component: function(){
      return import('../views/HomeView')
    }
  },
  { 
    path: '/cart',
    name: 'cart',
    component: function(){
      return import('../views/Cart')
    },
    beforeEnter: ifAuthenticated
  },
  { 
    path: '/order',
    name: 'order',
    component: function(){
      return import('../views/Orders')
    },
    beforeEnter: ifAuthenticated
  },
  { 
    path: '/login',
    name: 'login',
    component: function(){
      return import('../views/Login')
    },
    beforeEnter: ifNotAuthenticated,
  },
  { 
    path: '/register',
    name: 'register',
    component: function(){
      return import('../views/Register')
    },
    beforeEnter: ifNotAuthenticated,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router