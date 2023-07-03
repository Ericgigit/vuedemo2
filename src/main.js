import Vue from 'vue'
import App from './App.vue'
import router from './router' //引入vue-router
import ElementUI from 'element-ui';             //全局引入element
import 'element-ui/lib/theme-chalk/index.css';    //全局引入element的样式

Vue.config.productionTip = false

Vue.use(ElementUI);     //全局注入element

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
