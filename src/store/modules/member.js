import { getMemberList } from "../../request/member";
export default {
    namespaced: true,
    state() {
        return {
            //会员列表
            memberList: []
        }
    },
    mutations: {
        //初始化会员列表
        memberListInit(state, list) {
            state.memberList = list;
        }
    },
    actions: {
        //请求会员列表
        getMemberListAction({ commit }) {
            getMemberList().then(list => {
                if (list) {
                    commit("memberListInit", list);
                }
            })
        }
    }
}