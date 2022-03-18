import request from "@/utils/request";

export function getTodayTip(){
    return request({
        url:'/tip/today',
        method: 'get',
    })
}
export function getTip(page, size) {
    return request({
        url: '/tip/getAll',
        method: 'get',
        params: {
            pageNo: page,
            size: size
        }
    })
}
export function deleteOne(id) {
    return request({
        url: `/tip/deleteOne/${id}`,
        method: 'delete',
    })
}

export function insertOne(data) {
    return request({
        url: '/tip/insertOne',
        method: 'post',
        data: data
    })
}
