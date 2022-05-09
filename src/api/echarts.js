import request from "@/utils/request";

export function getTag() {
    return request({
        url: '/echarts/getTag',
        method: 'get'
    })
}
export function getPost() {
    return request({
        url: '/echarts/getPostsByUser',
        method: 'get'
    })
}
