//导入axios
import axios from "../utils/http";

//获取规格列表
// params={page:"页码",size:"每一页显示的数据条数"}
export async function getSpecsList(params) {
    const res = await axios.get("/specslist", {
        params
    });
    if (res.code == 200) {
        return res.list;
    }
    return false;
}

//获取商品规格总数
export async function getSpecsTotal() {
    const res = await axios.get("/specscount");
    if (res.code == 200) {
        return res.list[0].total;
    }
    return false;
} 
