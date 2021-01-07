import Vue from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/src/jquery.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'popper.js/dist/popper.js';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import axios from 'axios';
import Vuex from 'vuex';
import VueRouter from 'vue-router';


/* pages linnks */
import StoredCustomers from "./views/StoredCustomers.vue";
import StoredOrders from "./views/StoredOrders.vue"
import StoredAddons from "./views/StoredAddons.vue"
import StoredSupplies from "./views/StoredSupply.vue"
import StoredProducts from "./views/StoredProducts.vue"
import teaanalogin from "./views/Login.vue";

axios.defaults.headers.common['Authorization'] = 'Tea Ana'
axios.defaults.headers.get['Accepts'] = 'application/json'

const reqInterceptor = axios.interceptors.request.use(config => {
  console.log('Request Interceptor', config)
  return config
})
const resInterceptor = axios.interceptors.response.use(res => {
  console.log('Response Interceptor', res)
  return res
})
axios.interceptors.request.eject(reqInterceptor)
axios.interceptors.response.eject(resInterceptor)
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

Vue.config.productionTip = false
Vue.prototype.$http = axios;
const accessToken = localStorage.getItem('access_token')

if (accessToken) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = accessToken
}



Vue.use(Vuex);
Vue.use(VueRouter);
const store = new Vuex.Store({
  state: {
    authenticated: false
  },
  mutations: {
    setAuthentication(state, status) {
      state.authenticated = status;
    }
  }
});


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    {
      path: '/teaana-products',
      name: 'StoredProducts',
      component: StoredProducts,
      beforeEnter: (to, from, next) => {
        if (store.state.authenticated == false) {
          next("/teaana-login")
        }
        else {
          next();
        }
      }


    },
    {
      path: '/teaana-supplies',
      name: 'StoredSupplies',
      component: StoredSupplies,
      beforeEnter: (to, from, next) => {
        if (store.state.authenticated == false) {
          next("/teaana-login")
        }
        else {
          next();
        }
      }


    },
    {
      path: '/teaana-addons',
      name: 'StoredAddons',
      component: StoredAddons,
      beforeEnter: (to, from, next) => {
        if (store.state.authenticated == false) {
          next("/teaana-login")
        }
        else {
          next();
        }
      }

    },
    {
      path: '/teaana-orders',
      name: 'StoredOrders',
      component: StoredOrders,
      beforeEnter: (to, from, next) => {
        if (store.state.authenticated == false) {
          next("/teaana-login")
        }
        else {
          next();
        }
      }


    },
    {
      path: '/teaana-customer',
      name: 'StoredCustomers',
      component: StoredCustomers,
      beforeEnter: (to, from, next) => {
        if (store.state.authenticated == false) {
          next("/teaana-login")
        }
        else {
          next();
        }
      }


    }, {

      path: '/teaana-login',
      name: 'Login',
      component: teaanalogin,
    },
    {
      path: '/',
      name: 'Login',
      component: teaanalogin,

    },
  ]

});
new Vue({

  render: h => h(App),
  store: store,
  router: router,
}).$mount('#app');
