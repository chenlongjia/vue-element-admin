import axios from "../utils/http";

export async function getSeckillList() {
    const res = await axios.get("/secklist");
    if (res.code == 200) {
        return res.list;
    }
    return false;
}