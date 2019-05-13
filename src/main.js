// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$axios = axios;  //在Vue的原型上添加$axios方法
Vue.prototype.qs = qs ;
axios.defaults.baseURL='http://localhost:8090/graduationProject/haitunAdmin/public/admin/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
