import Vue from "vue";
import axios from "axios";
// 导入element-ui的消息提示方法
import { Message } from "element-ui";
//配置基础域名
axios.defaults.baseURL = "http://localhost:3000/api";

//请求拦截器
axios.interceptors.request.use(config => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo") || "{}");
    //必须通过自定义请求头authorization,将登录凭证发送给数据接口
    config.headers.authorization = loginInfo.token;
    return config;
})
//响应拦截器
axios.interceptors.response.use(response => {
    //登录超时
    if (response.data.code == 403) {
        Message({
            type: "warning",
            message: response.data.msg
        });
        //将页面重定向登录页面
        location.href = "/login";
    }
    return response.data;
})

//将axios挂载到vue的原型对象上
Vue.prototype.$http = axios;

export default axios;

