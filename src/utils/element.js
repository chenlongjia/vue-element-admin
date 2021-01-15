import Vue from "vue";

//导入element核心文件
import ElementUi from "element-ui";

//导入element核心样式文件
import "element-ui/lib/theme-chalk/index.css";
//注册插件
Vue.use(ElementUi);

//成功提示框
Vue.prototype.$success = function (message) {
    this.$message({
        type: "success",
        message
    });
}
//是爱提示框
Vue.prototype.$error = function (message) {
    this.$message({
        type: "warning",
        message
    });
}
//确认提示框
Vue.prototype.$myConfirm = function (callback) {
    this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        callback && callback();
    }).catch(() => {
    });
}


