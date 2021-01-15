//导入axios
import axios from "../utils/http";

//获取商品列表
export async function getGoodsList(params) {
    const res = await axios.get("/goodslist", {
        params
    });
    if (res.code == 200) {
        return res.list;
    }
    return false;
}

//获取商品总数
export async function getGoodsTotal() {
    const res = await axios.get("/goodscount");
    if (res.code == 200) {
        return res.list[0].total;
    }
    return false;
}