import Vue from 'vue'
import App from './App.vue'
import router from './router' //引入vue-router
import ElementUI from 'element-ui';             //全局引入element
import 'element-ui/lib/theme-chalk/index.css';    //全局引入element的样式
import VueAMap from 'vue-amap';

Vue.config.productionTip = false

Vue.use(ElementUI);     //全局注入element

Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: 'c233377f6f0a3483056311953fb19f8a', // 替换为您在高德开放平台上注册的API密钥
  plugin: ['AMap.MapType', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType'],
  v: '1.4.15',
});


new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
