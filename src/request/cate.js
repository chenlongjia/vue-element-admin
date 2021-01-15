//导入axios
import axios from "../utils/http";

//获取分类列表的树形结构
export async function getCateList() {
    const res = await axios.get("/catelist", {
        params: {
            istree: 1
        }
    });
    if (res.code == 200) {
        return res.list;
    }
    return false;
}