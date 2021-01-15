import { getBannerList } from "../../request/banner";

export default {
    namespaced: true,
    state() {
        return {
            //轮播图列表
            bannerList: []
        }
    },
    mutations: {
        //初始化列表
        bannerListInit(state, list) {
            state.bannerList = list;
        }
    },
    actions: {
        getBannerListAction({ commit }) {
            getBannerList().then(list => {
                if (list) {
                    commit("bannerListInit", list)
                }
            })
        }
    }
}