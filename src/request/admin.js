//导入axios
import axios from "../utils/http";

//获取管理员列表
export async function getAdminList(params) {
    const res = await axios.get("/userlist", { params });
    if (res.code == 200) {
        return res.list;
    }
    return false;
}
//获取数据总条数
export async function getAdminTotal() {
    const res = await axios.get("/usercount");
    if (res.code == 200) {
        // console.log(res);
        return res.list[0].total;
    }
    return false;
}