<template>
  <fullscreen ref="fullscreen">
    <el-container>
      <el-aside :width="asideWidth">
        <h3 class="logo-text">小U商城后台</h3>
        <!-- 主导航 -->
        <el-menu
          :collapse="collapse"
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#333"
          text-color="#fff"
          active-text-color="#fff"
          :collapse-transition="false"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">管理中心</span>
          </el-menu-item>

          <!-- <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统设置</span>
          </template>
          <el-menu-item index="/menu">
            <span slot="title">菜单管理</span>
          </el-menu-item>
          <el-menu-item index="/role">
            <span slot="title">角色管理</span>
          </el-menu-item>
          <el-menu-item index="/admin">
            <span slot="title">管理员管理</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-goods"></i>
            <span>商城管理</span>
          </template>
          <el-menu-item index="/cate">
            <span slot="title">分类管理</span>
          </el-menu-item>
          <el-menu-item index="/specs">
            <span slot="title">规格管理</span>
          </el-menu-item>
          <el-menu-item index="/goods">
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-menu-item index="3-4">
            <span slot="title">轮播图管理</span>
          </el-menu-item>
          <el-menu-item index="3-5">
            <span slot="title">会员管理</span>
          </el-menu-item>
          <el-menu-item index="3-6">
            <span slot="title">活动管理</span>
          </el-menu-item>
        </el-submenu> -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              :index="val.url"
              v-for="val in item.children"
              :key="val.id"
            >
              <span slot="title">{{ val.title }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <el-button
            @click="collapse = !collapse"
            type="primary"
            size="mini"
            icon="el-icon-s-fold"
          ></el-button>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>管理中心</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-button
            @click="$router.back()"
            icon="el-icon-back"
            size="mini"
            circle
          ></el-button>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ username }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div>
                  <i class="el-icon-user"></i>
                  <span>个人信息</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="fullScreen">
                  <i class="el-icon-full-screen"></i>
                  <span>全屏预览</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="loginOut">
                  <i class="el-icon-switch-button"></i>
                  <span>安全退出</span>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <!-- 二级路由占位符 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </fullscreen>
</template>

<script>
import Vue from "vue";
//导入全屏显示组件vue-fullscreen
import fullscreen from "vue-fullscreen";
Vue.use(fullscreen);
//导入vuex辅助方法
import { mapState, mapMutations } from "vuex";
export default {
  created() {
    //初始化数据
    this.menuListInit();
    //初始化登录账号
    this.usernameInit();
  },
  data() {
    return {
      collapse: false, //false:非折叠 true: 折叠
    };
  },
  computed: {
    ...mapState(["menuList", "username"]),
    //导航栏折叠事件
    asideWidth() {
      return this.collapse ? "64px" : "226px";
    },
  },
  methods: {
    ...mapMutations(["menuListInit", "usernameInit"]),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //安全退出
    loginOut() {
      //删除localStorage中的登录凭证
      localStorage.removeItem("loginInfo");
      //退出提示
      this.$success("退出成功");
      //跳转到登录页面
      this.$router.push("/login");
    },
    //全屏显示
    fullScreen() {
      //也可以操作原生dom实现全屏显示
      // document.documentElement.webkitRequestFullScreen();
      this.$refs.fullscreen.toggle();
    },
  },
};
</script>

<style scoped>
.el-container {
  height: 100vh;
}
/* logo */
.logo-text {
  background-color: #444;
  color: #fff;
  line-height: 60px;
  font-weight: normal;
  letter-spacing: 4px;
  text-align: center;
  white-space: nowrap;
}
/* 导航 */
.el-menu {
  height: calc(100vh - 60px);
  border-right: 0;
}
/* 导航高亮 */
.is-active {
  background-color: #409eff !important;
}
/* 页面头部 */
.el-header {
  background-color: #fff;
  line-height: 60px;
  display: flex;
  align-items: center;
}
.el-header button {
  height: 26px;
}
.el-breadcrumb {
  margin: 0 20px;
}
.el-dropdown {
  position: absolute;
  right: 20px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  overflow: hidden;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>