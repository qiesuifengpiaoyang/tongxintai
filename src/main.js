import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Axios from 'axios'
import './plugins/vant.js'
import './assets/common.scss'
import './assets/font/iconfont.css'
// import * as fundebug from "fundebug-javascript";
// import fundebugVue from "fundebug-vue";
// fundebug.apikey = "dfd63af1908265db498ab449a002aad025bd8cc329a46ce0b37427e1d58a936e"
// fundebugVue(fundebug, Vue);
// Vue.prototype.$http = Axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
