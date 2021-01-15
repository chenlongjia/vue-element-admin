import { getSeckillList } from "../../request/seckill";

export default {
    namespaced: true,
    state() {
        return {
            seckillList: []
        }
    },
    mutations: {
        //初始化秒杀列表
        seckillListInit(state, list) {
            state.seckillList = list;
        }
    },
    actions: {
        seckillListAction({ commit }) {
            getSeckillList().then(list => {
                if (list) {
                    commit("seckillListInit", list)
                }
            })
        }
    }
}