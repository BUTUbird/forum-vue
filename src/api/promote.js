import request from "@/utils/request";

export function getList(){
    return request({
        url:'/promotion/list',
        method: 'get',
    })
}
export function getPromotion(page, size) {
    return request({
        url: '/promotion/getAll',
        method: 'get',
        params: {
            pageNo: page,
            size: size
        }
    })
}
export function deleteOne(id) {
    return request({
        url: `/promotion/deleteOne/${id}`,
        method: 'delete',
    })
}

export function insertOne(data) {
    return request({
        url: '/promotion/insertOne',
        method: 'post',
        data: data
    })
}
