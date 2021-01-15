import axios from "../utils/http";

export async function getBannerList() {
    const res = await axios.get("/bannerlist");
    if (res.code == 200) {
        return res.list;
    }
    return false;
}