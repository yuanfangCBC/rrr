// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Mint from 'mint-ui'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import VueScroller from 'vue-scroller'

Vue.config.productionTip = false

Vue.use(Mint);
Vue.use(vueResource);
Vue.use(VueScroller);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
