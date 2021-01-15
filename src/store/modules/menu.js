// 导入数据请求方法
import { getMenuList } from "../../request/menu"
export default {
    //开启独立的命名空间
    namespaced: true,
    state() {
        return {
            //菜单列表
            menuList: []
        }
    },
    mutations: {
        //菜单初始化的方法 
        menuInit(state, list) {
            state.menuList = list;
        }
    },
    actions: {
        //请求菜单列表
        getMenuListAction({ commit }) {
            getMenuList().then(res => {
                if (res) {
                    commit("menuInit", res);
                }
            });
        }
    },
    getters: {

    }
}