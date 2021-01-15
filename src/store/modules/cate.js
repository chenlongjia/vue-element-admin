import { getCateList } from "../../request/cate";
export default {
    namespaced: true,
    state() {
        return {
            //分类列表
            cateList: []
        }
    },
    mutations: {
        //初始化分类列表
        cateListInit(state, list) {
            state.cateList = list;
        }
    },
    actions: {
        //获取分类列表
        getCateListAction({ commit }) {
            getCateList().then(list => {
                if (list) {
                    //调用cateListInit
                    commit("cateListInit", list);
                }
            })
        }
    }
}