import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//定义路由规则
const routes = [
  {
    path: "/login",
    component: () => import("../pages/Login"),
    meta: {
      title: "管理员登录"
    }
  },
  {
    path: "/",
    component: () => import("../pages/Layout"),
    meta: {
      title: "小U商城后台管理系统"
    },
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("../pages/home/Index"),
        meta: {
          title: "管理中心"
        }
      },
      {
        path: "/menu",
        component: () => import("../pages/menu/index"),
        meta: {
          title: "菜单管理"
        }
      },
      {
        path: "/role",
        component: () => import("../pages/role/Index"),
        meta: {
          title: "角色管理"
        }
      },
      {
        path: "/admin",
        component: () => import("../pages/admin/Index"),
        meta: {
          title: "管理员管理"
        }
      },
      {
        path: "/category",
        component: () => import("../pages/cate/Index"),
        meta: {
          title: "分类管理"
        }
      },
      {
        path: "/specs",
        component: () => import("../pages/specs/Index"),
        meta: {
          title: "规格管理"
        }
      },
      {
        path: "/goods",
        component: () => import("../pages/goods/Index"),
        meta: {
          title: "商品管理"
        }
      },
      {
        path: "/member",
        component: () => import("../pages/member/Index"),
        meta: {
          title: "会员管理"
        }
      },
      {
        path: "/banner",
        component: () => import("../pages/banner/Index"),
        meta: {
          title: "轮播图管理"
        }
      },
      {
        path: "/seckill",
        component: () => import("../pages/seckill/Index"),
        meta: {
          title: "秒杀活动"
        }
      }
    ]
  },
  {
    path: "*",
    component: () => import("../pages/NotFound"),
    meta: {
      title: "404"
    }
  }
]
const router = new Router({
  mode: "history",
  routes
})

//路由导航守卫,实现登录拦截
router.beforeEach(function (to, from, next) {
  //读取localStorage
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo") || "{}");
  //如果用户访问的是非登录页面
  if (to.path != "/login") {
    if (!loginInfo.token) {
      return next("/login");
    }
    //校验访问权限
    const menusUrl = loginInfo.menus_url;
    menusUrl.push("/home");
    menusUrl.push("/");
    if (menusUrl.indexOf(to.path) === -1) {
      return next("/home");
    }
  }
  next();
  //动态设置页面标题
  document.title = to.meta.title;
});

export default router;
