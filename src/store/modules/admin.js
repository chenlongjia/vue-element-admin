//导入数据请求方法
import { getAdminList, getAdminTotal } from "../../request/admin";
export default {
    namespaced: true,
    state() {
        return {
            //管理员列表
            adminList: [],
            //管理员总数
            adminTotal: 0
        }
    },
    mutations: {
        //初始化adminList
        adminListInit(state, list) {
            state.adminList = list;
        },
        adminTotalInit(state, total) {
            state.adminTotal = total;
        }
    },
    actions: {
        //params={page:"页码",size:"每页显示的条数"}
        getAdminListAction({ commit }, params) {
            getAdminList(params).then(list => {
                //通过commit调用同步matation方法
                if (list) {
                    commit("adminListInit", list);
                }

            })
        },
        getAdminTotalAction({ commit }) {
            getAdminTotal().then(total => {
                //通过commit调用同步matation方法
                if (total) {
                    commit("adminTotalInit", total);
                }

            })
        },
    }
}