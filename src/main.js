// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//导入封装好的axios
import "./utils/http"
//导入element核心文件
import "./utils/element"
//导入数据存储
import store from "./store/index"
//导入初始化样式文件
import "./assets/css/reset.css"
//配置图片基础域名
Vue.prototype.$imgBaseUrl = "http://localhost:3000";

Vue.config.productionTip = false

//时间过滤器
Vue.filter("dateFmt", (time, divider = "-") => {
  //   console.log(time);
  const date = new Date(Number(time));
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const mm = date.getMinutes();
  const s = date.getSeconds();
  return `${y}${divider}${m}${divider}${d} ${h}:${mm}:${s}`;
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
