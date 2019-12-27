import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入按需引入的组件
import './plugins/element.js'

// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/font_icon3/iconfont.css'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
//  引入axios 插件可以发起请求
import axios from 'axios'
//  axios 方法挂载到vue 原型对象 可以全局使用
Vue.prototype.$axios = axios

//  配置请求基准路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
