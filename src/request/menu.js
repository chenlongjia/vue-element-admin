import axios from "../utils/http";
//获取菜单列表
export async function getMenuList() {
    const res = await axios.get("/menulist?istree=1");
    if (res.code == 200) {
        return res.list;
    }
    return false;
}