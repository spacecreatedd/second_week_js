import { createStore } from 'vuex'
import { loginRequest, logoutRequest, registerRequest } from '@/utils/api';

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
    products: [],
    cartData: [],
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    products: state => state.products,
    carts: state => state.cartData,
  },
  mutations: {
    GET_CARDS: (state, cartData) => {
      state.cartData = cartData;
    },
    AUTH_SUCCESS: (state, token) => {
      state.token = token;
    },
    AUTH_ERROR: (state) => {
      state.token = '';
    },
    CLEAR_TOKEN: (state) => {
      state.token = null;
    },
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    REMOVE_FROM_CART: (state, itemId) => {
      const existItem = state.cartData.find((item) => item.product_id === itemId.product_id)
      if (existItem > 1) {
        existItem.quantity--;
      } else {
        state.cartData = state.cartData.filter((item) => item.product_id !== itemId);
      }
    },

  },
  actions: {
    GET_CARD_DATAS: ({ commit }) => {
      const token = localStorage.getItem('myAppToken');
      fetch('https://jurapro.bhuser.ru/api-shop/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        return response.json();
      }).then(result => { commit('GET_CARDS', result.data) }).catch(error => console.error(error))
    },
    GET_PRODUCTS: ({ commit }) => {
      fetch("https://jurapro.bhuser.ru/api-shop/products").then((response) => response.json()).then((data) => { commit('SET_PRODUCTS', data.data) }).catch((error) => { console.error(error) })
    },
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        loginRequest(user).then((token) => {
          commit('AUTH_SUCCESS', token);
          localStorage.setItem('myAppToken', token);
          resolve();
        })
          .catch(() => {
            commit('AUTH_ERROR');
            localStorage.removeItem('myAppToken')
            reject();
          })
      })
    },
    AUTH_CREATE: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        registerRequest(user).then((token) => {
          commit('AUTH_SUCCESS', token);
          localStorage.setItem('myAppToken', token);
          resolve();
        })
          .catch(() => {
            commit('AUTH_ERROR');
            localStorage.removeItem('myAppToken')
            reject();
          })
      })
    },
    AUTH_LOGOUT: ({ commit }) => {
      return new Promise((resolve, reject) => {
        logoutRequest().then(() => {
          commit('CLEAR_TOKEN');
          localStorage.removeItem('myAppToken')
          resolve();
        })
          .catch((error) => {
            reject(error);
          });
      })
    },
    REMOVE_CARD_ITEM: ({ commit }, itemId) => {
      const token = localStorage.getItem('myAppToken');
      fetch(`https://jurapro.bhuser.ru/api-shop/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => response.json()).then(() => { commit('REMOVE_FROM_CART', itemId); }).catch((error) => { console.error(error) })
    },
    PLACE_ORDER: ({ commit }) => {
      const token = localStorage.getItem('myAppToken');
      fetch('https://jurapro.bhuser.ru/api-shop/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        if (response.ok) {
          console.log('aformlen')
        } else {
          console.log('error')
        }
      }).catch(error => { console.error(error) })
    },
    ADD_CARD_ITEM: ({ commit }, itemId) => {
      const token = localStorage.getItem('myAppToken');
      fetch(`https://jurapro.bhuser.ru/api-shop/cart/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }).then((response) => { response.json() }).catch((error) => { console.error('error', error) });
    },
  },
  modules: {
  }
})