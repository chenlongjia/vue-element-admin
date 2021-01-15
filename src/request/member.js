import axios from "../utils/http";

//
export async function getMemberList() {
    const res = await axios.get("/memberlist");
    if (res.code == 200) {
        return res.list;
    }
    return false;
}