import Vue from 'vue';
import App from './App';
import router from './router';

// 当前不是生产环境
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  components: {
    App,
  },
  template: '<App></App>',
});
