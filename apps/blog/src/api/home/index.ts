import { request } from "#api/instance";
import { HomeData } from "#api/types";

export function getHomeData() {
    return request<HomeData>("/?json=1");
}
