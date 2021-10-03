// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './custom/axios.custom'
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import Notification from 'vue-notification'
import CKEditor from 'ckeditor4-vue'
import store from './store'
import VeeValidate from 'vee-validate'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(CKEditor)
Vue.use(VeeValidate)
Vue.use(Notification)
Vue.use(Stomp)
Vue.use(SockJS)
Vue.prototype.axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
export default app
