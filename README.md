## 项目说明

    该项目是一个电商后台管理系统,用到的技术栈有vue+vue-router+vuex+axios+elementui+echarts.所有的数据都是从服务器实时获取到的,
    主要包括商品管理 角色管理 管理员管理 商品规格管理 轮播图管理以及秒杀活动管理等几大模块.
    具有真实的登录,注册,管理数据以及登录权限功能.

## 项目架构

src -- 源码目录
request -- axios网络请求定义
assets -- 静态图片资源文件
router -- vue-router路由配置
store -- vuex的状态管理
styles -- 全局css样式
utils -- 工具类
pages -- 前端页面

    ├── home -- 首页
    ├── layout -- 通用页面加载框架
    ├── login -- 登录页
    ├── admin -- 管理员管理页面
    ├── cate -- 商品分类页面
    └── goods -- 商品管理页面
    └── specs-- 规格管理页面
    └── member-- 会员管理页面
    └── menu-- 菜单管理页面
    └── role-- 角色管理页面
    └── seckill--秒杀活动管理页面

## 项目启动步骤

    1.首先得保证要有nodejs环境
    2.该项目为前后端分离项目,所以得依赖后台接口服务
    3.clone项目后,直接在项目根目录运行npm install或者npm i安装项目所需的第三方依赖(建议将npm切换为淘宝源镜像,因为本人就曾因为npm下载依赖慢而胡乱中断安装,而导致产生了很多令人头疼的bug)
    4.安装完依赖后,运行npm run dev或者npm start运行项目即可.

## END

测试账号admin, 密码admin888

我是慕筱佳, 一位混迹在互联网领域的IT小白, 如果对您对此项目有兴趣，可以点 "Star" 支持一下 谢谢！ ^_^
或者您可以 "follow" 一下，我后续也将会不断开源更多的的项目, 来与大家一起分享技术的成果.
