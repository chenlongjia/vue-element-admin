//导入数据请求的方法
import { getGoodsList, getGoodsTotal } from "../../request/goods";

export default {
    namespaced: true,
    state() {
        return {
            goodsList: [],  //商品列表
            goodsTotal: 0   //商品总数
        }
    },
    mutations: {
        //初始化商品列表
        goodsListInit(state, list) {
            state.goodsList = list;
        },
        //初始化商品总数
        goodsTotalInit(state, total) {
            state.goodsTotal = total;
        }
    },
    actions: {
        //请求商品列表 params={page:"页码",size:"每页数据条数"}
        getGoodsListAction({ commit }, params) {
            getGoodsList(params).then(list => {
                if (list) {
                    //通过commit调用数据初始化
                    commit("goodsListInit", list);
                }
            })
        },
        //请求商品总数
        getGoodsTotalAction({ commit }) {
            getGoodsTotal().then(total => {
                if (total) {
                    commit("goodsTotalInit", total);
                }
            })
        }
    }
}