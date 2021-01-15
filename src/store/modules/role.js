//导入数据请求方法
import { getRoleList } from "../../request/role"
export default {
    namespaced: true,
    state() {
        //角色列表
        return {
            roleList: []
        }
    },
    //初始化角色列表
    // state:系统自动注入的
    // list:额外参数,异步action通过数据接口获取的角色列表
    mutations: {
        roleListInit(state, list) {
            state.roleList = list;
        }
    },
    actions: {
        getRoleListAction({ commit }) {
            getRoleList().then(res => {
                if (res) {
                    //通过commit调用同步mutation
                    commit("roleListInit", res);
                }
            })
        }
    }
}