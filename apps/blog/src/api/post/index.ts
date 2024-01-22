import { request } from "#api/instance";
import { SinglePostData } from "#api/types";

export function getPostData(path: string) {
    return request<SinglePostData>(`${path}?json=1`);
}
