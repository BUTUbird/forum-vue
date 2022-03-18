import request from "@/utils/request";

export function getBillBoard(){
    return request({
        url:'/billboard/show',
        method: 'get',
    })
}
export function getBillboard(page, size) {
    return request({
        url: '/billboard/getAll',
        method: 'get',
        params: {
            pageNo: page,
            size: size
        }
    })
}
export function deleteOne(id) {
    return request({
        url: `/billboard/deleteOne/${id}`,
        method: 'delete',
    })
}
export function disableOne(id) {
    return request({
        url: `/billboard/disableOne/${id}`,
        method: 'get',
    })
}
export function ableOne(id) {
    return request({
        url: `/billboard/ableOne/${id}`,
        method: 'post',
    })
}
export function insertOne(data) {
    return request({
        url: `/billboard/insertOne/${data}`,
        method: 'post',
    })
}
