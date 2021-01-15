import { getSpecsList, getSpecsTotal } from "../../request/specs";

export default {
    namespaced: true,
    state() {
        return {
            //规格列表
            specsList: [],
            //规格总条数
            specsTotal: 0

        }
    },
    mutations: {
        //初始化规格列表
        specsListInit(state, list) {
            state.specsList = list;
        },
        // 初始化列表总数
        specsTotalInit(state, count) {
            state.specsTotal = count;
        },
    },
    actions: {
        //请求规格列表
        getSpecsListAction({ commit }, params) {
            getSpecsList(params).then(list => {
                if (list) {
                    commit("specsListInit", list);
                }
            })
        },
        //请求规格总数
        getSpecsTotalAction({ commit }) {
            getSpecsTotal().then(count => {
                if (count) {
                    commit("specsTotalInit", count);
                }
            })
        },
    }
}